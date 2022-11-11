import {
    addFixedMaskCharacters,
    EventListener,
    getClipboardDataText,
    isEventProducingCharacter,
    removeFixedMaskCharacters,
    validateValueWithMask,
} from './utils';
import {MaskExpression, MaskOptions} from './types';

export class Mask {
    private readonly eventListener = new EventListener(this.elementRef);

    constructor(
        private readonly elementRef: HTMLInputElement | HTMLTextAreaElement,
        private readonly options: MaskOptions,
    ) {
        this.eventListener.listen('focus', () => this.fillInputWithFixedValues());
        /**
         * After user press any button, events always happen in the same order as they are listed here.
         * `Keydown`-event is useful for preprocessing (input is not changed yet, so you can easily prevent any changes).
         * `Input`-event is useful for postprocessing (input was already changed, and you can add some fixed value).
         */
        this.eventListener.listen('keydown', event => this.handleKeydown(event));
        this.eventListener.listen('paste', event => this.handlePaste(event));
        this.eventListener.listen('input', () => this.fillInputWithFixedValues());
    }

    destroy(): void {
        this.eventListener.destroy();
    }

    private get maskExpression(): MaskExpression {
        const {mask} = this.options;

        return typeof mask === 'function' ? mask() : mask;
    }

    /**
     * TODO Predictive text from native mobile keyboards dont trigger keydown event!
     */
    private handleKeydown(event: KeyboardEvent): void {
        const isBackspace = event.key === 'Backspace';
        this.fillInputWithFixedValues(isBackspace);

        if (isBackspace) {
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

        const currentValue = this.elementRef.value;
        const caretPosition = this.elementRef.selectionStart || 0;
        const newPossibleValue =
            currentValue.slice(0, caretPosition) +
            event.key +
            currentValue.slice(caretPosition);

        if (!validateValueWithMask(newPossibleValue, this.maskExpression)) {
            event.preventDefault();
        }
    }

    private handlePaste(event: ClipboardEvent): void {
        // TODO: finish later
        // eslint-disable-next-line no-console
        console.log('===[handlePaste]===', event.cancelable, getClipboardDataText(event));
    }

    private fillInputWithFixedValues(isBackspace: boolean = false): void {
        const {value, selectionStart} = this.elementRef;
        const {formattedValue, newCaretPosition} = addFixedMaskCharacters(
            value,
            this.maskExpression,
            isBackspace,
            selectionStart ?? 0,
        );

        if (formattedValue !== value) {
            this.elementRef.value = formattedValue;
            this.elementRef.setSelectionRange(newCaretPosition, newCaretPosition);
        }
    }

    /**
     * TODO: user can select many (or all) characters and press Backspace
     */
    private handleBackspace(event: KeyboardEvent): void {
        const {maskExpression} = this;

        if (!Array.isArray(maskExpression)) {
            return;
        }

        const {selectionStart, value = ''} = this.elementRef;
        const deletedCharIndex = selectionStart ? selectionStart - 1 : 0;
        const {newValue, newCaretPosition: cp} = removeFixedMaskCharacters(
            value,
            maskExpression,
            deletedCharIndex,
        );

        const {formattedValue, newCaretPosition} = addFixedMaskCharacters(
            newValue.slice(0, cp) + newValue.slice(cp + 1),
            maskExpression,
            true,
            cp,
        );

        this.elementRef.value = formattedValue;

        this.elementRef.setSelectionRange(newCaretPosition, newCaretPosition);

        event.preventDefault();
    }
}
