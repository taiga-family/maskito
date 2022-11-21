import {ElementState, MaskExpression} from '../../../types';
import {isFixedCharacter} from './is-fixed-character';

export function addFixedMaskCharacters(
    initialElementState: ElementState,
    mask: MaskExpression,
): ElementState {
    if (!Array.isArray(mask)) {
        return initialElementState;
    }

    let maskedFrom: number | null = null;
    let maskedTo: number | null = null;

    const [initialFrom, initialTo] = initialElementState.selection;

    const maskedValue = Array.from(initialElementState.value).reduce(
        (validatedCharacters, char, charIndex) => {
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

            if (maskedFrom === null && charIndex >= initialFrom) {
                maskedFrom = newValidatedChars.length;
            }

            if (maskedTo === null && charIndex >= initialTo) {
                maskedTo = newValidatedChars.length;
            }

            return newValidatedChars + char;
        },
        '',
    );

    return {
        value: maskedValue,
        selection: [maskedFrom ?? maskedValue.length, maskedTo ?? maskedValue.length],
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
