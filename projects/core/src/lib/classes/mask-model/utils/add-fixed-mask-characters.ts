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
    ].reduce((validatedCharacters, char, charIndex) => {
        const leadingCharacters = getLeadingFixedCharacters(
            mask,
            validatedCharacters,
            char,
        );
        const newValidatedChars = validatedCharacters + leadingCharacters;
        const charConstraint = mask[newValidatedChars.length];

        if (isFixedCharacter(charConstraint)) {
            return newValidatedChars + charConstraint;
        }

        if (!char.match(charConstraint)) {
            return newValidatedChars;
        }

        if (!maskedCaretPosition && charIndex >= selectionStart) {
            maskedCaretPosition = newValidatedChars.length;
        }

        return newValidatedChars + char;
    }, '');

    maskedCaretPosition = maskedCaretPosition ?? maskedValue.length;

    return {
        value: maskedValue,
        selection: [maskedCaretPosition, maskedCaretPosition],
    };
}

function getLeadingFixedCharacters(
    mask: Array<RegExp | string>,
    formattedValue: string,
    typedCharacter: string,
): string {
    let leadingFixedCharacters = ``;

    for (let i = formattedValue.length; i < mask.length; i++) {
        const charConstraint = mask[i];

        if (!isFixedCharacter(charConstraint)) {
            return leadingFixedCharacters;
        }

        if (charConstraint === typedCharacter) {
            return leadingFixedCharacters;
        }

        leadingFixedCharacters += charConstraint;
    }

    return leadingFixedCharacters;
}
