import type {ElementState} from '../../../types';
import {getLeadingFixedCharacters} from './get-leading-fixed-characters';
import {isFixedCharacter} from './is-fixed-character';
import {validateValueWithMask} from './validate-value-with-mask';

export function guessValidValueByPattern(
    elementState: ElementState,
    mask: Array<RegExp | string>,
    initialElementState: ElementState | null,
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
            const charConstraint = mask[newValidatedChars.length] || '';

            if (maskedFrom === null && charIndex >= elementState.selection[0]) {
                maskedFrom = newValidatedChars.length;
            }

            if (maskedTo === null && charIndex >= elementState.selection[1]) {
                maskedTo = newValidatedChars.length;
            }

            if (isFixedCharacter(charConstraint)) {
                return newValidatedChars + charConstraint;
            }

            if (char.match(charConstraint)) {
                return newValidatedChars + char;
            }

            return leadingCharacters.startsWith(char)
                ? newValidatedChars
                : validatedCharacters;
        },
        '',
    );

    const trailingFixedCharacters = getLeadingFixedCharacters(
        mask,
        maskedValue,
        '',
        initialElementState,
    );

    return {
        value: validateValueWithMask(maskedValue + trailingFixedCharacters, mask)
            ? maskedValue + trailingFixedCharacters
            : maskedValue,
        selection: [maskedFrom ?? maskedValue.length, maskedTo ?? maskedValue.length],
    };
}
