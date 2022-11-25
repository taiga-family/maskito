import {
    EventListener,
    extendToNotEmptyRange,
    isBeforeInputEventSupported,
    isEventProducingCharacter,
} from './utils';
import {ElementState, MaskitoOptions, SelectionRange} from './types';
import {MaskModel} from './classes';

export class Maskito {
    private readonly eventListener = new EventListener(this.element);

    constructor(
        private readonly element: HTMLInputElement | HTMLTextAreaElement,
        private readonly options: MaskitoOptions,
    ) {
        this.conformValueToMask();

        if (isBeforeInputEventSupported(element)) {
            this.eventListener.listen('beforeinput', event => {
                switch (event.inputType) {
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
                    case 'insertFromPaste':
                        return this.handlePaste(event, event.data || '');
                    case 'insertText':
                    default:
                        try {
                            new MaskModel(this.elementState, this.options).addCharacters(
                                this.elementState.selection,
                                event.data || '',
                            );
                        } catch {
                            event.preventDefault();
                        }
                }
            });
        } else {
            // TODO: drop it after browser support bump
            this.eventListener.listen('keydown', event => this.handleKeydown(event));
            this.eventListener.listen('paste', event =>
                this.handlePaste(event, event.clipboardData?.getData('text/plain') || ''),
            );
        }

        this.eventListener.listen('input', () => this.conformValueToMask());
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

    private handleKeydown(event: KeyboardEvent): void {
        const pressedKey = event.key;

        if (pressedKey === 'Backspace' || pressedKey === 'Delete') {
            return this.handleDelete(event, pressedKey === 'Delete');
        }

        if (!isEventProducingCharacter(event)) {
            return;
        }

        const maskModel = new MaskModel(this.elementState, this.options);

        try {
            maskModel.addCharacters(this.elementState.selection, pressedKey);
        } catch {
            event.preventDefault();
        }
    }

    private conformValueToMask(): void {
        const maskModel = new MaskModel(this.elementState, this.options);

        this.updateValue(maskModel.value);
        this.updateSelectionRange(maskModel.selection);
    }

    private handleDelete(event: Event, isForward: boolean): void {
        const {elementState, options} = this;

        if (!Array.isArray(options.mask)) {
            return;
        }

        const [from, to] = extendToNotEmptyRange(elementState.selection, isForward);
        const maskModel = new MaskModel(elementState, options);

        maskModel.deleteCharacters([from, to]);

        const {value, selection} = maskModel;
        const newPossibleValue =
            elementState.value.slice(0, from) + elementState.value.slice(to);

        if (newPossibleValue === value) {
            return;
        }

        event.preventDefault();

        if (value === elementState.value) {
            return this.updateSelectionRange(isForward ? [to, to] : [from, from]);
        }

        this.updateValue(value);
        this.updateSelectionRange(selection);
    }

    private handlePaste(event: Event, insertedText: string): void {
        const {elementState, options} = this;
        const maskModel = new MaskModel(elementState, options);

        try {
            maskModel.addCharacters(elementState.selection, insertedText);
        } catch {
            return event.preventDefault();
        }

        const [from, to] = elementState.selection;
        const newPossibleValue =
            elementState.value.slice(0, from) +
            insertedText +
            elementState.value.slice(to);
        const {value, selection} = maskModel;

        if (newPossibleValue !== value) {
            event.preventDefault();

            this.updateValue(value);
            this.updateSelectionRange(selection);
        }
    }

    private updateValue(newValue: string): void {
        if (this.element.value !== newValue) {
            this.element.value = newValue;
        }
    }

    private updateSelectionRange([from, to]: SelectionRange): void {
        if (this.element.selectionStart !== from || this.element.selectionEnd !== to) {
            this.element.setSelectionRange(from, to);
        }
    }
}
