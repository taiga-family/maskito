import {EventListener, isEventProducingCharacter} from './utils';
import {MaskExpression, MaskitoOptions} from './types';
import {MaskModel} from './classes';

export class Maskito {
    private readonly eventListener = new EventListener(this.elementRef);

    constructor(
        private readonly elementRef: HTMLInputElement | HTMLTextAreaElement,
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

    private get maskExpression(): MaskExpression {
        const {mask} = this.options;

        return typeof mask === 'function' ? mask() : mask;
    }

    private get selectionStart(): number {
        return this.elementRef.selectionStart || 0;
    }

    private get selectionEnd(): number {
        return this.elementRef.selectionEnd || 0;
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

        const {elementRef, maskExpression, selectionStart, selectionEnd} = this;
        const maskModel = new MaskModel(elementRef.value, selectionStart, maskExpression);

        try {
            maskModel.addCharacters([selectionStart, selectionEnd], pressedKey);
        } catch {
            event.preventDefault();
        }
    }

    private fillWithFixedValues(): void {
        const {elementRef, maskExpression, selectionStart} = this;
        const maskModel = new MaskModel(elementRef.value, selectionStart, maskExpression);
        const {value, caretIndex} = maskModel;

        this.updateValue(value);
        this.updateCaretIndex(caretIndex);
    }

    private handleBackspace(event: KeyboardEvent): void {
        const {elementRef, maskExpression, selectionStart, selectionEnd} = this;

        if (!Array.isArray(maskExpression)) {
            return;
        }

        event.preventDefault();

        const maskModel = new MaskModel(elementRef.value, selectionStart, maskExpression);

        maskModel.removeCharacters([selectionStart, selectionEnd]);

        this.updateValue(maskModel.value);
        this.updateCaretIndex(maskModel.caretIndex);
    }

    private handlePaste(event: ClipboardEvent): void {
        event.preventDefault();

        const {elementRef, maskExpression, selectionStart, selectionEnd} = this;
        const maskModel = new MaskModel(elementRef.value, selectionStart, maskExpression);

        maskModel.addCharacters(
            [selectionStart, selectionEnd],
            event.clipboardData?.getData('text/plain') ?? '',
        );

        this.updateValue(maskModel.value);
        this.updateCaretIndex(maskModel.caretIndex);
    }

    private updateValue(newValue: string): void {
        const {elementRef} = this;

        if (elementRef.value !== newValue) {
            elementRef.value = newValue;
        }
    }

    private updateCaretIndex(newCaretIndex: number): void {
        const {elementRef} = this;

        if (elementRef.selectionStart !== newCaretIndex) {
            elementRef.setSelectionRange(newCaretIndex, newCaretIndex);
        }
    }
}
