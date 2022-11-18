import {ElementState, MaskExpression} from '../../../types';
import {isFixedCharacter} from './is-fixed-character';

export function addFixedMaskCharacters(
    initialElementState: ElementState,
    mask: MaskExpression,
): ElementState {
    if (!Array.isArray(mask)) {
        return initialElementState;
    }

    let maskedCaretPosition: number | null = null;
    // TODO handle cases when `selectionStart` !== `selectionEnd`
    const [selectionStart] = initialElementState.selection;

    const maskedValue = [
        ...Array.from(initialElementState.value),
        '', // extra iteration to take all tailed fixed characters
    ].reduce((acc, char, charIndex) => {
        let formattedFinalString = acc;

        for (let i = formattedFinalString.length; i < mask.length; i++) {
            const charConstraint = mask[i];

            if (!isFixedCharacter(charConstraint) && !char.match(charConstraint)) {
                return formattedFinalString;
            }

            if (!isFixedCharacter(charConstraint) || charConstraint === char) {
                if (charIndex === selectionStart) {
                    maskedCaretPosition = formattedFinalString.length;
                }

                formattedFinalString += char;

                return formattedFinalString;
            }

            formattedFinalString += charConstraint;
        }

        if (charIndex === selectionStart) {
            maskedCaretPosition = formattedFinalString.length;
        }

        return formattedFinalString;
    }, '');

    maskedCaretPosition = maskedCaretPosition ?? maskedValue.length;

    return {
        value: maskedValue,
        selection: [maskedCaretPosition, maskedCaretPosition],
    };
}
