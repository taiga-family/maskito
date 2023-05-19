import {MaskitoPreprocessor} from '@maskito/core';

/**
 * It replaces pseudo characters with valid one.
 * @example User types '.' (but separator is equal to comma) => dot is replaced with comma.
 * @example User types hyphen / en-dash / em-dash => it is replaced with minus.
 */
export function createPseudoCharactersPreprocessor(
    validCharacter: string,
    pseudoCharacters: string[],
): MaskitoPreprocessor {
    const pseudoCharactersRegExp = new RegExp(`[${pseudoCharacters.join('')}]`, 'gi');

    return ({elementState, data}) => {
        const {value, selection} = elementState;

        return {
            elementState: {
                selection,
                value: value.replace(pseudoCharactersRegExp, validCharacter),
            },
            data: data.replace(pseudoCharactersRegExp, validCharacter),
        };
    };
}
