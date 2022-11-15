import {MaskExpression} from '../../../types';
import {isFixedCharacter} from './is-fixed-character';

export function addFixedMaskCharacters(
    value: string,
    mask: MaskExpression,
    caretPositionBefore: number,
): {maskedValue: string; maskedCaretPosition: number} {
    if (!Array.isArray(mask)) {
        return {maskedValue: value, maskedCaretPosition: caretPositionBefore};
    }

    let maskedCaretPosition: number | null = null;

    const maskedValue = [
        ...Array.from(value),
        '', // extra iteration to take all tailed fixed characters
    ].reduce((acc, char, charIndex) => {
        let formattedFinalString = acc;

        for (let i = formattedFinalString.length; i < mask.length; i++) {
            const charConstraint = mask[i];

            if (!isFixedCharacter(charConstraint) && !char.match(charConstraint)) {
                return formattedFinalString;
            }

            if (!isFixedCharacter(charConstraint) || charConstraint === char) {
                if (charIndex === caretPositionBefore) {
                    maskedCaretPosition = formattedFinalString.length;
                }

                formattedFinalString += char;

                return formattedFinalString;
            }

            formattedFinalString += charConstraint;
        }

        if (charIndex === caretPositionBefore) {
            maskedCaretPosition = formattedFinalString.length;
        }

        return formattedFinalString;
    }, '');

    return {maskedValue, maskedCaretPosition: maskedCaretPosition ?? maskedValue.length};
}
