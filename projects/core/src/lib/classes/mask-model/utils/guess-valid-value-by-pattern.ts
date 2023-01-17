import {ElementState} from '../../../types';
import {getLeadingFixedCharacters} from './get-leading-fixed-characters';
import {isFixedCharacter} from './is-fixed-character';

export function guessValidValueByPattern(
    initialElementState: ElementState,
    mask: Array<RegExp | string>,
): ElementState {
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
