import {isFixedCharacter} from './is-fixed-character';

export function getLeadingFixedCharacters(
    mask: Array<RegExp | string>,
    alreadyValidatedValue: string,
    newTypedCharacter: string,
): string {
    let leadingFixedCharacters = ``;

    for (let i = alreadyValidatedValue.length; i < mask.length; i++) {
        const charConstraint = mask[i];

        if (!isFixedCharacter(charConstraint) || charConstraint === newTypedCharacter) {
            return leadingFixedCharacters;
        }

        leadingFixedCharacters += charConstraint;
    }

    return leadingFixedCharacters;
}
