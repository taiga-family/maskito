import {isFixedCharacter} from './is-fixed-character';

export function getLeadingFixedCharacters(
    mask: Array<RegExp | string>,
    validatedValuePart: string,
    newCharacter: string,
): string {
    let leadingFixedCharacters = ``;

    for (let i = validatedValuePart.length; i < mask.length; i++) {
        const charConstraint = mask[i];

        if (!isFixedCharacter(charConstraint) || charConstraint === newCharacter) {
            return leadingFixedCharacters;
        }

        leadingFixedCharacters += charConstraint;
    }

    return leadingFixedCharacters;
}
