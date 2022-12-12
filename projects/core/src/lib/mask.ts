import {MaskHistory, MaskModel} from './classes';
import {MASKITO_DEFAULT_OPTIONS} from './constants';
import {ElementState, MaskitoOptions, SelectionRange} from './types';
import {
    areElementValuesEqual,
    EventListener,
    extendToNotEmptyRange,
    isBeforeInputEventSupported,
    isEventProducingCharacter,
} from './utils';

export class Maskito extends MaskHistory {
    private readonly eventListener = new EventListener(this.element);
    private readonly options = {...MASKITO_DEFAULT_OPTIONS, ...this.maskitoOptions};

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
            // TODO: drop it after browser support bump
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

    destroy(): void {
        this.eventListener.destroy();
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
        const {elementState} = this.options.preprocessor({
            elementState: this.elementState,
            data: '',
            actionType: 'validation',
        });
        const maskModel = new MaskModel(elementState, this.options);
        const {value, selection} = this.options.postprocessor(maskModel);

        this.updateValue(value);
        this.updateSelectionRange(selection);
    }

    private handleDelete(event: Event, isForward: boolean): void {
        const initialState: ElementState = {
            value: this.elementState.value,
            selection: extendToNotEmptyRange(this.elementState.selection, isForward),
        };
        const {elementState} = this.options.preprocessor({
            elementState: initialState,
            data: '',
            actionType: isForward ? 'deleteForward' : 'deleteBackward',
        });
        const maskModel = new MaskModel(elementState, this.options);
        const [from, to] = elementState.selection;

        maskModel.deleteCharacters([from, to]);

        const newElementState = this.options.postprocessor(maskModel);
        const newPossibleValue =
            initialState.value.slice(0, initialState.selection[0]) +
            initialState.value.slice(initialState.selection[1]);

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

        this.updateValue(newElementState.value);
        this.updateSelectionRange(newElementState.selection);
        this.updateHistory(newElementState);
    }

    private handleInsert(event: Event, data: string): void {
        const {elementState, data: insertedText = data} = this.options.preprocessor({
            data,
            elementState: this.elementState,
            actionType: 'insert',
        });
        const maskModel = new MaskModel(elementState, this.options);

        try {
            maskModel.addCharacters(elementState.selection, insertedText);
        } catch {
            return event.preventDefault();
        }

        const [from, to] = elementState.selection;
        const newPossibleValue =
            elementState.value.slice(0, from) + data + elementState.value.slice(to);
        const {value, selection} = this.options.postprocessor(maskModel);

        if (newPossibleValue !== value) {
            event.preventDefault();

            this.updateValue(value);
            this.updateSelectionRange(selection);
            this.updateHistory({value, selection});
        }
    }

    private handleEnter(event: Event): void {
        if (this.isTextArea) {
            this.handleInsert(event, '\n');
        }
    }

    protected updateValue(newValue: string): void {
        if (this.element.value !== newValue) {
            this.element.value = newValue;
        }
    }

    protected updateSelectionRange([from, to]: SelectionRange): void {
        if (this.element.selectionStart !== from || this.element.selectionEnd !== to) {
            this.element.setSelectionRange?.(from, to);
        }
    }
}
