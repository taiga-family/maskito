import type {MaskitoMaskExpression} from '../../../types';
import {isFixedCharacter} from './is-fixed-character';
import {removeFixedMaskCharacters} from './remove-fixed-mask-characters';

/**
 * Checks if new characters being added are invalid for their target positions in the mask.
 * Only validates single character input (typing), not multi-character input (pasting).
 *
 * @param params - Validation parameters
 * @param params.newCharacters - The characters being added by the user
 * @param params.newUnmaskedLeadingValuePart - The unmasked value including the new characters
 * @param params.unmaskedFrom - The starting position in the unmasked value where new characters are inserted
 * @param params.maskExpression - The mask expression to validate against
 * @returns true if the new characters are invalid, false if they are valid
 */
export function newCharacterIsInvalid({
    newCharacters,
    newUnmaskedLeadingValuePart,
    unmaskedFrom,
    maskExpression,
}: {
    newCharacters: string;
    newUnmaskedLeadingValuePart: string;
    unmaskedFrom: number;
    maskExpression: MaskitoMaskExpression;
}): boolean {
    // Only validate when typing a single character (not pasting multiple)
    if (newCharacters.length !== 1) {
        return false;
    }

    // For RegExp masks, test if adding the character would match the pattern
    if (!Array.isArray(maskExpression)) {
        const testValue = newUnmaskedLeadingValuePart;

        return !testValue.match(maskExpression);
    }

    const unmaskedNewChars = removeFixedMaskCharacters(
        {value: newUnmaskedLeadingValuePart, selection: [0, 0]},
        maskExpression,
    ).value.slice(unmaskedFrom);

    // Check if any of the new characters fail to match their corresponding regex in the mask
    let maskIndex = 0;
    let unmaskedIndex = 0;

    // Find the starting position in the mask for the new characters
    while (unmaskedIndex < unmaskedFrom && maskIndex < maskExpression.length) {
        const maskChar = maskExpression[maskIndex];

        if (maskChar && !isFixedCharacter(maskChar)) {
            unmaskedIndex++;
        }

        maskIndex++;
    }

    // Validate each new character against its position in the mask
    for (
        let i = 0;
        i < unmaskedNewChars.length && maskIndex < maskExpression.length;
        i++
    ) {
        // Skip fixed characters in the mask
        while (
            maskIndex < maskExpression.length &&
            maskExpression[maskIndex] &&
            isFixedCharacter(maskExpression[maskIndex]!)
        ) {
            maskIndex++;
        }

        if (maskIndex < maskExpression.length) {
            const charConstraint = maskExpression[maskIndex];
            const char = unmaskedNewChars[i];

            if (
                charConstraint &&
                !isFixedCharacter(charConstraint) &&
                char &&
                !char.match(charConstraint)
            ) {
                return true; // Invalid character found
            }

            maskIndex++;
        }
    }

    return false; // All characters are valid
}
