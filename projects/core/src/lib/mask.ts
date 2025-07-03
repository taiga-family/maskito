import {MaskHistory, MaskModel} from './classes';
import {MASKITO_DEFAULT_OPTIONS} from './constants';
import {createBrokenDefaultPlugin, createDoubleSpacePlugin} from './plugins';
import type {
    ElementState,
    MaskitoElement,
    MaskitoOptions,
    SelectionRange,
    TypedInputEvent,
} from './types';
import {
    areElementStatesEqual,
    areElementValuesEqual,
    EventListener,
    getLineSelection,
    getNotEmptySelection,
    getWordSelection,
    isRedo,
    isUndo,
    maskitoPipe,
    maskitoTransform,
} from './utils';

const BUILT_IN_PLUGINS = [createDoubleSpacePlugin(), createBrokenDefaultPlugin()];

export class Maskito extends MaskHistory {
    private readonly isTextArea = this.element.nodeName === 'TEXTAREA';
    private readonly eventListener = new EventListener(this.element);
    private readonly options: Required<MaskitoOptions> = {
        ...MASKITO_DEFAULT_OPTIONS,
        ...this.maskitoOptions,
    };

    private upcomingElementState: ElementState | null = null;

    private readonly preprocessor = maskitoPipe(this.options.preprocessors);

    private readonly postprocessor = maskitoPipe(this.options.postprocessors);

    private readonly teardowns = this.options.plugins
        .concat(BUILT_IN_PLUGINS)
        .map((plugin) => plugin(this.element, this.options));

    constructor(
        private readonly element: MaskitoElement,
        private readonly maskitoOptions: MaskitoOptions,
    ) {
        super();
        this.updateHistory(this.elementState);

        this.eventListener.listen('keydown', (event) => {
            if (isRedo(event)) {
                event.preventDefault();

                return this.redo();
            }

            if (isUndo(event)) {
                event.preventDefault();

                return this.undo();
            }
        });

        this.eventListener.listen('beforeinput', (event) => {
            const isForward = event.inputType.includes('Forward');

            this.updateHistory(this.elementState);

            switch (event.inputType) {
                case 'deleteByCut':
                case 'deleteContentBackward':
                case 'deleteContentForward':
                    return this.handleDelete({
                        event,
                        isForward,
                        selection: getNotEmptySelection(this.elementState, isForward),
                    });
                case 'deleteHardLineBackward':
                case 'deleteHardLineForward':
                case 'deleteSoftLineBackward':
                case 'deleteSoftLineForward':
                    return this.handleDelete({
                        event,
                        isForward,
                        selection: getLineSelection(this.elementState, isForward),
                        force: true,
                    });
                case 'deleteWordBackward':
                case 'deleteWordForward':
                    return this.handleDelete({
                        event,
                        isForward,
                        selection: getWordSelection(this.elementState, isForward),
                    });
                case 'historyRedo':
                    event.preventDefault();

                    return this.redo();
                // historyUndo/historyRedo will not be triggered if value was modified programmatically
                case 'historyUndo':
                    event.preventDefault();

                    return this.undo();
                case 'insertCompositionText':
                    return; // will be handled inside `compositionend` event
                case 'insertLineBreak':
                case 'insertParagraph':
                    return this.handleEnter(event);
                case 'insertReplacementText':
                    /**
                     * According {@link https://www.w3.org/TR/input-events-2 W3C specification}:
                     * > `insertReplacementText` – insert or replace existing text by means of a spell checker,
                     * > auto-correct, writing suggestions or similar.
                     * ___
                     * Firefox emits `insertReplacementText` event for its suggestion/autofill and for spell checker.
                     * However, it is impossible to detect which part of the textfield value is going to be replaced
                     * (`selectionStart` and `selectionEnd` just equal to the last caret position).
                     * ___
                     * Chrome does not fire `beforeinput` event for its suggestion/autofill.
                     * It emits only `input` event with `inputType` and `data` set to `undefined`.
                     * ___
                     * All these browser limitations make us to validate the result value later in `input` event.
                     */
                    return;
                case 'insertFromDrop':
                case 'insertFromPaste':
                case 'insertText':
                default:
                    return this.handleInsert(
                        event,
                        event.data ??
                            // `event.data` for `contentEditable` is always `null` for paste/drop events
                            event.dataTransfer?.getData('text/plain') ??
                            '',
                    );
            }
        });

        this.eventListener.listen(
            'input',
            () => {
                if (
                    this.upcomingElementState &&
                    !areElementStatesEqual(this.upcomingElementState, this.elementState)
                ) {
                    this.updateElementState(this.upcomingElementState);
                }

                this.upcomingElementState = null;
            },
            {capture: true},
        );

        this.eventListener.listen('input', ({inputType}) => {
            if (inputType === 'insertCompositionText') {
                return; // will be handled inside `compositionend` event
            }

            this.ensureValueFitsMask();
            this.updateHistory(this.elementState);
        });

        this.eventListener.listen('compositionend', () => {
            this.ensureValueFitsMask();
            this.updateHistory(this.elementState);
        });
    }

    public destroy(): void {
        this.eventListener.destroy();
        this.teardowns.forEach((teardown) => teardown?.());
    }

    protected updateElementState(
        {value, selection}: ElementState,
        eventInit?: Pick<TypedInputEvent, 'data' | 'inputType'>,
    ): void {
        const initialValue = this.elementState.value;

        this.updateValue(value);
        this.updateSelectionRange(selection);

        if (eventInit && initialValue !== value) {
            this.dispatchInputEvent(eventInit);
        }
    }

    private get elementState(): ElementState {
        const {value, selectionStart, selectionEnd} = this.element;

        return {
            value,
            selection: [selectionStart ?? 0, selectionEnd ?? 0],
        };
    }

    private get maxLength(): number {
        const {maxLength} = this.element;

        return maxLength === -1 ? Infinity : maxLength;
    }

    private updateSelectionRange([from, to]: SelectionRange): void {
        const {element} = this;

        if (
            element.matches(':focus') &&
            (element.selectionStart !== from || element.selectionEnd !== to)
        ) {
            element.setSelectionRange?.(from, to);
        }
    }

    private updateValue(value: string): void {
        /**
         * Don't "disturb" unnecessarily `value`-setter
         * (i.e. it breaks React controlled input behavior)
         */
        if (this.element.value !== value || this.element.isContentEditable) {
            this.element.value = value;
        }
    }

    private ensureValueFitsMask(): void {
        this.updateElementState(maskitoTransform(this.elementState, this.options), {
            inputType: 'insertText',
            data: null,
        });
    }

    private dispatchInputEvent(
        eventInit: Pick<TypedInputEvent, 'data' | 'inputType'> = {
            inputType: 'insertText',
            data: null,
        },
    ): void {
        if (globalThis.InputEvent) {
            this.element.dispatchEvent(
                new InputEvent('input', {
                    ...eventInit,
                    bubbles: true,
                    cancelable: false,
                }),
            );
        }
    }

    private handleDelete({
        event,
        selection,
        isForward,
    }: {
        event: TypedInputEvent;
        selection: SelectionRange;
        isForward: boolean;
        force?: boolean;
    }): void {
        const initialState: ElementState = {
            value: this.elementState.value,
            selection,
        };
        const {elementState} = this.preprocessor(
            {
                elementState: initialState,
                data: '',
            },
            isForward ? 'deleteForward' : 'deleteBackward',
        );
        const maskModel = new MaskModel(elementState, this.options);

        maskModel.deleteCharacters();

        const newElementState = this.postprocessor(maskModel, initialState);

        if (
            areElementValuesEqual(initialState, elementState, maskModel, newElementState)
        ) {
            const [from, to] = elementState.selection;

            event.preventDefault();

            // User presses Backspace/Delete for the fixed value
            return this.updateSelectionRange(isForward ? [to, to] : [from, from]);
        }

        this.upcomingElementState = newElementState;
    }

    private handleInsert(event: TypedInputEvent, data: string): void {
        const {options, maxLength, elementState: initialElementState} = this;
        const {elementState, data: insertedText = data} = this.preprocessor(
            {
                data,
                elementState: initialElementState,
            },
            'insert',
        );
        const maskModel = new MaskModel(elementState, options);

        try {
            maskModel.addCharacters(insertedText);
        } catch {
            return event.preventDefault();
        }

        const [from, to] = initialElementState.selection;
        const newPossibleState: ElementState = {
            value:
                initialElementState.value.slice(0, from) +
                data +
                initialElementState.value.slice(to),
            selection: [from + data.length, from + data.length],
        };

        this.upcomingElementState = this.clampState(
            this.postprocessor(maskModel, initialElementState),
        );

        if (
            !areElementStatesEqual(
                this.clampState(newPossibleState),
                this.upcomingElementState,
            ) &&
            options.overwriteMode === 'replace' &&
            newPossibleState.value.length > maxLength
        ) {
            /**
             * Browsers know nothing about Maskito and its `overwriteMode`.
             * When textfield value length is already equal to attribute `maxlength`,
             * pressing any key (even with valid value) does not emit `input` event.
             */
            this.dispatchInputEvent({inputType: 'insertText', data});
        }
    }

    private handleEnter(event: TypedInputEvent): void {
        if (this.isTextArea || this.element.isContentEditable) {
            this.handleInsert(event, '\n');
        }
    }

    private clampState({value, selection}: ElementState): ElementState {
        const [from, to] = selection;
        const max = this.maxLength;

        return {
            value: value.slice(0, max),
            selection: [Math.min(from, max), Math.min(to, max)],
        };
    }
}
