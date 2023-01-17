import {MaskHistory, MaskModel} from './classes';
import {MASKITO_DEFAULT_OPTIONS} from './constants';
import {ElementState, MaskitoOptions, SelectionRange, TypedInputEvent} from './types';
import {
    areElementValuesEqual,
    EventListener,
    extendToNotEmptyRange,
    isBeforeInputEventSupported,
    isEventProducingCharacter,
} from './utils';

export class Maskito extends MaskHistory {
    private readonly eventListener = new EventListener(this.element);
    private readonly options: Required<MaskitoOptions> = {
        ...MASKITO_DEFAULT_OPTIONS,
        ...this.maskitoOptions,
    };

    constructor(
        private readonly element: HTMLInputElement | HTMLTextAreaElement,
        private readonly maskitoOptions: MaskitoOptions,
    ) {
        super();
        this.conformValueToMask();
        this.updateHistory(this.elementState);

        this.eventListener.listen('keydown', event => {
            const {ctrlKey, key, metaKey, shiftKey} = event;

            if ((metaKey && shiftKey && key === 'z') || (ctrlKey && key === 'y')) {
                event.preventDefault();

                return this.redo();
            }

            if ((ctrlKey || metaKey) && key === 'z') {
                event.preventDefault();

                return this.undo();
            }
        });

        if (isBeforeInputEventSupported(element)) {
            this.eventListener.listen('beforeinput', event => {
                this.updateHistory(this.elementState);

                switch (event.inputType) {
                    // historyUndo/historyRedo will not be triggered if value was modified programmatically
                    case 'historyUndo':
                        event.preventDefault();

                        return this.undo();
                    case 'historyRedo':
                        event.preventDefault();

                        return this.redo();
                    case 'deleteContentBackward':
                    case 'deleteWordBackward': // TODO
                    case 'deleteByCut':
                        return this.handleDelete(event, false);
                    case 'deleteContentForward':
                    case 'deleteWordForward': // TODO
                        return this.handleDelete(event, true);
                    case 'insertFromDrop':
                        // We don't know caret position at this moment
                        // (inserted content will be handled later in "input"-event)
                        return;
                    case 'insertLineBreak':
                        return this.handleEnter(event);
                    case 'insertFromPaste':
                    case 'insertText':
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

        this.eventListener.listen('input', () => {
            this.conformValueToMask();
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

    private get isTextArea(): boolean {
        return this.element.nodeName === 'TEXTAREA';
    }

    destroy(): void {
        this.eventListener.destroy();
    }

    protected updateSelectionRange([from, to]: SelectionRange): void {
        if (this.element.selectionStart !== from || this.element.selectionEnd !== to) {
            this.element.setSelectionRange?.(from, to);
        }
    }

    protected updateValue(
        newValue: string,
        eventInit: Pick<TypedInputEvent, 'data' | 'inputType'> = {
            inputType: 'insertText',
            data: null,
        },
    ): void {
        if (this.element.value !== newValue) {
            const globalObject = typeof window !== 'undefined' ? window : globalThis;

            this.element.value = newValue;

            // TODO: replace `globalObject` with `globalThis` after bumping Firefox to 65+
            // @see https://caniuse.com/?search=globalThis
            if (globalObject?.InputEvent) {
                this.element.dispatchEvent(
                    new InputEvent('input', {
                        ...eventInit,
                        bubbles: true,
                        cancelable: true,
                    }),
                );
            }
        }
    }

    private handleKeydown(event: KeyboardEvent): void {
        const pressedKey = event.key;

        switch (pressedKey) {
            case 'Backspace':
            case 'Delete':
                return this.handleDelete(event, pressedKey === 'Delete');
            case 'Enter':
                return this.handleEnter(event);
        }

        if (!isEventProducingCharacter(event)) {
            return;
        }

        this.handleInsert(event, pressedKey);
    }

    private conformValueToMask(): void {
        const initialElementState = this.elementState;
        const {elementState} = this.options.preprocessor(
            {
                elementState: initialElementState,
                data: '',
            },
            'validation',
        );
        const maskModel = new MaskModel(elementState, this.options);
        const {value, selection} = this.options.postprocessor(
            maskModel,
            initialElementState,
        );

        this.updateValue(value);
        this.updateSelectionRange(selection);
    }

    private handleDelete(event: Event | TypedInputEvent, isForward: boolean): void {
        const initialState: ElementState = {
            value: this.elementState.value,
            selection: extendToNotEmptyRange(this.elementState.selection, isForward),
        };
        const [initialFrom, initialTo] = initialState.selection;
        const {elementState} = this.options.preprocessor(
            {
                elementState: initialState,
                data: '',
            },
            isForward ? 'deleteForward' : 'deleteBackward',
        );
        const maskModel = new MaskModel(elementState, this.options);
        const [from, to] = elementState.selection;

        maskModel.deleteCharacters([from, to]);

        const newElementState = this.options.postprocessor(maskModel, initialState);
        const newPossibleValue =
            initialState.value.slice(0, initialFrom) +
            initialState.value.slice(initialTo);

        if (newPossibleValue === newElementState.value) {
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

        this.updateValue(newElementState.value, {
            inputType: 'inputType' in event ? event.inputType : inputTypeFallback,
            data: null,
        });
        this.updateSelectionRange(newElementState.selection);
        this.updateHistory(newElementState);
    }

    private handleInsert(event: Event | TypedInputEvent, data: string): void {
        const initialElementState = this.elementState;
        const {elementState, data: insertedText = data} = this.options.preprocessor(
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
        const {value, selection} = this.options.postprocessor(
            maskModel,
            initialElementState,
        );

        if (newPossibleValue !== value) {
            event.preventDefault();

            this.updateValue(value, {
                data,
                inputType: 'inputType' in event ? event.inputType : 'insertText',
            });
            this.updateSelectionRange(selection);
            this.updateHistory({value, selection});
        }
    }

    private handleEnter(event: Event): void {
        if (this.isTextArea) {
            this.handleInsert(event, '\n');
        }
    }
}
