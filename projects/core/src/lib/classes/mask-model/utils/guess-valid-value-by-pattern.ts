import {ElementState} from '../../../types';
import {getLeadingFixedCharacters} from './get-leading-fixed-characters';
import {isFixedCharacter} from './is-fixed-character';

export function guessValidValueByPattern(
    elementState: ElementState,
    mask: Array<RegExp | string>,
    initialElementState: ElementState,
): ElementState {
    let maskedFrom: number | null = null;
    let maskedTo: number | null = null;

    const maskedValue = Array.from(elementState.value).reduce(
        (validatedCharacters, char, charIndex) => {
            const leadingCharacters = getLeadingFixedCharacters(
                mask,
                validatedCharacters,
                char,
                initialElementState,
            );
            const newValidatedChars = validatedCharacters + leadingCharacters;
            const charConstraint = mask[newValidatedChars.length];

            if (isFixedCharacter(charConstraint)) {
                return newValidatedChars + charConstraint;
            }

            if (!char.match(charConstraint)) {
                return newValidatedChars;
            }

            if (maskedFrom === null && charIndex >= elementState.selection[0]) {
                maskedFrom = newValidatedChars.length;
            }

            if (maskedTo === null && charIndex >= elementState.selection[1]) {
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
