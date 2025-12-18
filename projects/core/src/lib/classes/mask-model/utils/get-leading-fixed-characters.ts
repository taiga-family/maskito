import type {ElementState} from '../../../types';
import {isFixedCharacter} from './is-fixed-character';

export function getLeadingFixedCharacters(
    mask: Array<RegExp | string>,
    validatedValuePart: string,
    newCharacter: string,
    initialElementState: ElementState | null,
): string {
    let leadingFixedCharacters = '';

    for (let i = validatedValuePart.length; i < mask.length; i++) {
        const charConstraint = mask[i] || '';
        const isInitiallyExisted = initialElementState?.value[i] === charConstraint;

        if (
            !isFixedCharacter(charConstraint) ||
            (charConstraint === newCharacter && !isInitiallyExisted)
        ) {
            return leadingFixedCharacters;
        }

        leadingFixedCharacters += charConstraint;
    }

    return leadingFixedCharacters;
}
