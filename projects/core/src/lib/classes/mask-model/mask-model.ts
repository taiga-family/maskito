import {MaskExpression} from '../../types';
import {validateValueWithMask} from './utils/validate-value-with-mask';
import {removeFixedMaskCharacters} from './utils/remove-fixed-mask-characters';
import {addFixedMaskCharacters} from './utils/add-fixed-mask-characters';

export class MaskModel {
    value = '';
    caretIndex = 0;

    constructor(
        readonly initialValue: string,
        readonly initialCaretIndex: number,
        private readonly mask: MaskExpression,
    ) {
        const {maskedValue, maskedCaretPosition} = addFixedMaskCharacters(
            initialValue,
            this.mask,
            initialCaretIndex,
        );

        this.value = maskedValue;
        this.caretIndex = maskedCaretPosition;
    }

    addCharacters(
        selectedRange: [from: number, to: number],
        newCharacters: string,
    ): void {
        const {unmaskedValue, unmaskedSelection} = removeFixedMaskCharacters(
            this.value,
            this.mask,
            selectedRange,
        );
        const [unmaskedFrom, unmaskedTo] = unmaskedSelection;
        const newUnmaskedValue =
            unmaskedValue.slice(0, unmaskedFrom) +
            newCharacters +
            unmaskedValue.slice(unmaskedTo);

        const {maskedValue, maskedCaretPosition} = addFixedMaskCharacters(
            newUnmaskedValue,
            this.mask,
            unmaskedTo + newCharacters.length,
        );

        if (!validateValueWithMask(maskedValue, this.mask)) {
            throw new Error('Invalid mask value');
        }

        this.value = maskedValue;
        this.caretIndex = maskedCaretPosition;
    }

    removeCharacters([from, to]: [from: number, to: number]): void {
        if (from === 0 && to === 0) {
            return;
        }

        if (from === to) {
            throw new Error('MaskModel.removeCharacters() accepts only not-empty range');
        }

        const {unmaskedValue, unmaskedSelection} = removeFixedMaskCharacters(
            this.value,
            this.mask,
            [from, to],
        );
        const [unmaskedFrom, unmaskedTo] = unmaskedSelection;
        const isOnlyFixedCharsSelected = unmaskedFrom === unmaskedTo;
        const isLastChar = unmaskedTo >= unmaskedValue.length;

        if (isOnlyFixedCharsSelected && !isLastChar) {
            this.caretIndex = from;
            return;
        }

        const newUnmaskedValue =
            unmaskedValue.slice(
                0,
                isOnlyFixedCharsSelected && isLastChar ? unmaskedFrom - 1 : unmaskedFrom,
            ) + unmaskedValue.slice(unmaskedTo);
        const {maskedValue, maskedCaretPosition} = addFixedMaskCharacters(
            newUnmaskedValue,
            this.mask,
            unmaskedFrom,
        );

        this.value = maskedValue;
        this.caretIndex = maskedCaretPosition;
    }
}
