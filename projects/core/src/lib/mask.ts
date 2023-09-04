import {MaskHistory, MaskModel} from './classes';
import {MASKITO_DEFAULT_OPTIONS} from './constants';
import {ElementState, MaskitoOptions, SelectionRange, TypedInputEvent} from './types';
import {
    areElementValuesEqual,
    EventListener,
    getLineSelection,
    getNotEmptySelection,
    getWordSelection,
    isBeforeInputEventSupported,
    isEventProducingCharacter,
    isRedo,
    isUndo,
    maskitoPipe,
    maskitoTransform,
} from './utils';

export class Maskito extends MaskHistory {
    private readonly isTextArea = this.element.nodeName === 'TEXTAREA';
    private readonly eventListener = new EventListener(this.element);
    private readonly options: Required<MaskitoOptions> = {
        ...MASKITO_DEFAULT_OPTIONS,
        ...this.maskitoOptions,
    };

    private readonly preprocessor = maskitoPipe(this.options.preprocessors);

    private readonly postprocessor = maskitoPipe(this.options.postprocessors);

    private readonly teardowns = this.options.plugins.map(plugin =>
        plugin(this.element, this.options),
    );

    constructor(
        private readonly element: HTMLInputElement | HTMLTextAreaElement,
        private readonly maskitoOptions: MaskitoOptions,
    ) {
        super();
        this.ensureValueFitsMask();
        this.updateHistory(this.elementState);

        this.eventListener.listen('keydown', event => {
            if (isRedo(event)) {
                event.preventDefault();

                return this.redo();
            }

            if (isUndo(event)) {
                event.preventDefault();

                return this.undo();
            }
        });

        if (isBeforeInputEventSupported(element)) {
            this.eventListener.listen('beforeinput', event => {
                const isForward = event.inputType.includes('Forward');

                this.updateHistory(this.elementState);

                switch (event.inputType) {
                    // historyUndo/historyRedo will not be triggered if value was modified programmatically
                    case 'historyUndo':
                        event.preventDefault();

                        return this.undo();
                    case 'historyRedo':
                        event.preventDefault();

                        return this.redo();
                    case 'deleteByCut':
                    case 'deleteContentBackward':
                    case 'deleteContentForward':
                        return this.handleDelete({
                            event,
                            isForward,
                            selection: getNotEmptySelection(this.elementState, isForward),
                        });
                    case 'deleteWordForward':
                    case 'deleteWordBackward':
                        return this.handleDelete({
                            event,
                            isForward,
                            selection: getWordSelection(this.elementState, isForward),
                            force: true,
                        });
                    case 'deleteSoftLineBackward':
                    case 'deleteSoftLineForward':
                    case 'deleteHardLineBackward':
                    case 'deleteHardLineForward':
                        return this.handleDelete({
                            event,
                            isForward,
                            selection: getLineSelection(this.elementState, isForward),
                            force: true,
                        });
                    case 'insertCompositionText':
                        return; // will be handled inside `compositionend` event
                    case 'insertLineBreak':
                        return this.handleEnter(event);
                    case 'insertFromPaste':
                    case 'insertText':
                    case 'insertFromDrop':
                    default:
                        return this.handleInsert(event, event.data || '');
                }
            });
        } else {
            /** TODO: drop it after browser support bump (Firefox 87+)
             * Also, replace union types `Event | TypedInputEvent` with `TypedInputEvent` inside:
             *** {@link handleDelete}
             *** {@link handleInsert}
             */
            this.eventListener.listen('keydown', event => this.handleKeydown(event));
            this.eventListener.listen('paste', event =>
                this.handleInsert(
                    event,
                    event.clipboardData?.getData('text/plain') || '',
                ),
            );
        }

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

    private get elementState(): ElementState {
        const {value, selectionStart, selectionEnd} = this.element;

        return {
            value,
            selection: [selectionStart || 0, selectionEnd || 0],
        };
    }

    private get maxLength(): number {
        const {maxLength} = this.element;

        return maxLength === -1 ? Infinity : maxLength;
    }

    destroy(): void {
        this.eventListener.destroy();
        this.teardowns.forEach(teardown => teardown?.());
    }

    protected updateElementState(
        {value, selection}: ElementState,
        eventInit: Pick<TypedInputEvent, 'data' | 'inputType'> = {
            inputType: 'insertText',
            data: null,
        },
    ): void {
        const initialValue = this.elementState.value;

        this.updateValue(value);
        this.updateSelectionRange(selection);

        if (initialValue !== value) {
            this.dispatchInputEvent(eventInit);
        }
    }

    private updateSelectionRange([from, to]: SelectionRange): void {
        if (this.element.selectionStart !== from || this.element.selectionEnd !== to) {
            this.element.setSelectionRange?.(from, to);
        }
    }

    private updateValue(value: string): void {
        this.element.value = value;
    }

    private ensureValueFitsMask(): void {
        this.updateElementState(maskitoTransform(this.elementState, this.options));
    }

    private dispatchInputEvent(
        eventInit: Pick<TypedInputEvent, 'data' | 'inputType'> = {
            inputType: 'insertText',
            data: null,
        },
    ): void {
        const globalObject = typeof window !== 'undefined' ? window : globalThis;

        // TODO: replace `globalObject` with `globalThis` after bumping Firefox to 65+
        // @see https://caniuse.com/?search=globalThis
        if (globalObject?.InputEvent) {
            this.element.dispatchEvent(
                new InputEvent('input', {
                    ...eventInit,
                    bubbles: true,
                    cancelable: false,
                }),
            );
        }
    }

    private handleKeydown(event: KeyboardEvent): void {
        const pressedKey = event.key;
        const isForward = pressedKey === 'Delete';

        switch (pressedKey) {
            case 'Backspace':
            case 'Delete':
                return this.handleDelete({
                    event,
                    isForward,
                    selection: getNotEmptySelection(this.elementState, isForward),
                });
            case 'Enter':
                return this.handleEnter(event);
        }

        if (!isEventProducingCharacter(event)) {
            return;
        }

        this.handleInsert(event, pressedKey);
    }

    private handleDelete({
        event,
        selection,
        isForward,
        force = false,
    }: {
        event: Event | TypedInputEvent;
        selection: SelectionRange;
        isForward: boolean;
        force?: boolean;
    }): void {
        const initialState: ElementState = {
            value: this.elementState.value,
            selection,
        };
        const [initialFrom, initialTo] = initialState.selection;
        const {elementState} = this.preprocessor(
            {
                elementState: initialState,
                data: '',
            },
            isForward ? 'deleteForward' : 'deleteBackward',
        );
        const maskModel = new MaskModel(elementState, this.options);
        const [from, to] = elementState.selection;

        maskModel.deleteCharacters([from, to]);

        const newElementState = this.postprocessor(maskModel, initialState);
        const newPossibleValue =
            initialState.value.slice(0, initialFrom) +
            initialState.value.slice(initialTo);

        if (newPossibleValue === newElementState.value && !force) {
            return;
        }

        event.preventDefault();

        if (
            areElementValuesEqual(initialState, elementState, maskModel, newElementState)
        ) {
            // User presses Backspace/Delete for the fixed value
            return this.updateSelectionRange(isForward ? [to, to] : [from, from]);
        }

        // TODO: drop it when `event: Event | TypedInputEvent` => `event: TypedInputEvent`
        const inputTypeFallback = isForward
            ? 'deleteContentForward'
            : 'deleteContentBackward';

        this.updateElementState(newElementState, {
            inputType: 'inputType' in event ? event.inputType : inputTypeFallback,
            data: null,
        });
        this.updateHistory(newElementState);
    }

    private handleInsert(event: Event | TypedInputEvent, data: string): void {
        const initialElementState = this.elementState;
        const {elementState, data: insertedText = data} = this.preprocessor(
            {
                data,
                elementState: initialElementState,
            },
            'insert',
        );
        const maskModel = new MaskModel(elementState, this.options);

        try {
            maskModel.addCharacters(elementState.selection, insertedText);
        } catch {
            return event.preventDefault();
        }

        const [from, to] = elementState.selection;
        const newPossibleValue =
            elementState.value.slice(0, from) + data + elementState.value.slice(to);
        const newElementState = this.postprocessor(maskModel, initialElementState);

        if (newElementState.value.length > this.maxLength) {
            return event.preventDefault();
        }

        if (newPossibleValue !== newElementState.value) {
            event.preventDefault();

            this.updateElementState(newElementState, {
                data,
                inputType: 'inputType' in event ? event.inputType : 'insertText',
            });
            this.updateHistory(newElementState);
        }
    }

    private handleEnter(event: Event): void {
        if (this.isTextArea) {
            this.handleInsert(event, '\n');
        }
    }
}
