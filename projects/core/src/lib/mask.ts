import {EventListener, getClipboardDataText, isEventProducingCharacter} from './utils';
import {MaskExpression, MaskOptions} from './types';
import {MaskModel} from './classes';

export class Mask {
    private readonly eventListener = new EventListener(this.elementRef);

    constructor(
        private readonly elementRef: HTMLInputElement | HTMLTextAreaElement,
        private readonly options: MaskOptions,
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

    /**
     * TODO Predictive text from native mobile keyboards don't trigger keydown event!
     */
    private handleKeydown(event: KeyboardEvent): void {
        const pressedKey = event.key;

        if (pressedKey === 'Backspace') {
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

        const {value, selectionStart, selectionEnd} = this.elementRef;
        const maskModel = new MaskModel(value, selectionStart || 0, this.maskExpression);

        try {
            maskModel.addCharacters([selectionStart || 0, selectionEnd || 0], pressedKey);
        } catch {
            event.preventDefault();
        }
    }

    private fillWithFixedValues(): void {
        const {value: initialValue, selectionStart} = this.elementRef;
        const maskModel = new MaskModel(
            initialValue,
            selectionStart || 0,
            this.maskExpression,
        );
        const {value, caretIndex} = maskModel;

        this.updateValue(value);
        this.updateCaretIndex(caretIndex);
    }

    private handleBackspace(event: KeyboardEvent): void {
        const {maskExpression} = this;

        if (!Array.isArray(maskExpression)) {
            return;
        }

        event.preventDefault();

        const {selectionStart, selectionEnd, value: initialValue} = this.elementRef;
        const maskModel = new MaskModel(
            initialValue,
            selectionStart ?? 0,
            maskExpression,
        );

        maskModel.removeCharacters([selectionStart ?? 0, selectionEnd ?? 0]);

        const {value, caretIndex} = maskModel;

        this.updateValue(value);
        this.updateCaretIndex(caretIndex);
    }

    private handlePaste(event: ClipboardEvent): void {
        // TODO: finish later
        // eslint-disable-next-line no-console
        console.log('===[handlePaste]===', event.cancelable, getClipboardDataText(event));
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
