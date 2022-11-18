import {EventListener, isEventProducingCharacter} from './utils';
import {ElementState, MaskitoOptions} from './types';
import {MaskModel} from './classes';

export class Maskito {
    private readonly eventListener = new EventListener(this.element);

    constructor(
        private readonly element: HTMLInputElement | HTMLTextAreaElement,
        private readonly options: MaskitoOptions,
    ) {
        this.fillWithFixedValues();

        /**
         * After user press any button, events always happen in the same order as they are listed here.
         * `Keydown`-event is useful for validation (input is not changed yet, so you can easily prevent any changes).
         * `Input`-event is useful for postprocessing (input was already changed, and you can add some fixed value).
         */
        this.eventListener.listen('keydown', event => this.handleKeydown(event));
        this.eventListener.listen('paste', event => this.handlePaste(event));
        this.eventListener.listen('input', () => this.fillWithFixedValues());
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

    /**
     * TODO Predictive text from native mobile keyboards don't trigger keydown event!
     */
    private handleKeydown(event: KeyboardEvent): void {
        const pressedKey = event.key;

        if (pressedKey === 'Backspace') {
            // TODO: Windows OS has also wonderful button "Delete" which removes characters to the right of the caret.
            return this.handleBackspace(event);
        }

        /**
         * "beforeinput" is more appropriate event for preprocessing of the input masking.
         * But it is not supported by Chrome 49+ (only from 60+) and by Firefox 52+ (only from 87+).
         * TODO: refactor with using "beforeinput" after browser support bump
         *
         * @see https://caniuse.com/?search=beforeinput
         * @see https://taiga-ui.dev/browser-support
         */
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

    private fillWithFixedValues(): void {
        const maskModel = new MaskModel(this.elementState, this.options);

        this.updateValue(maskModel.value);
        this.updateCaretIndex(maskModel.caretIndex);
    }

    private handleBackspace(event: KeyboardEvent): void {
        const {elementState, options} = this;

        if (!Array.isArray(options.mask)) {
            return;
        }

        const [selectionStart, selectionEnd] = elementState.selection;
        const [from, to]: [number, number] =
            selectionStart === selectionEnd
                ? [selectionStart - 1, selectionEnd]
                : [selectionStart, selectionEnd];
        const maskModel = new MaskModel(elementState, options);

        maskModel.removeCharacters([from, to]);

        const {value, caretIndex} = maskModel;
        const newPossibleValue =
            elementState.value.slice(0, from) + elementState.value.slice(to);

        if (newPossibleValue !== value) {
            event.preventDefault();

            this.updateValue(value);
            this.updateCaretIndex(caretIndex);
        }
    }

    private handlePaste(event: ClipboardEvent): void {
        const {elementState, options} = this;
        const maskModel = new MaskModel(elementState, options);
        const insertedText = event.clipboardData?.getData('text/plain') ?? '';

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
        const {value, caretIndex} = maskModel;

        if (newPossibleValue !== value) {
            event.preventDefault();

            this.updateValue(value);
            this.updateCaretIndex(caretIndex);
        }
    }

    private updateValue(newValue: string): void {
        if (this.element.value !== newValue) {
            this.element.value = newValue;
        }
    }

    // TODO: refactor and replace `updateCaretIndex` with `updateSelectionRange`
    private updateCaretIndex(newCaretIndex: number): void {
        if (this.element.selectionStart !== newCaretIndex) {
            this.element.setSelectionRange(newCaretIndex, newCaretIndex);
        }
    }
}
