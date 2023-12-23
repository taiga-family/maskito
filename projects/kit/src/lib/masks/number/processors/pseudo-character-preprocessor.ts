import {MaskitoPreprocessor} from '@maskito/core';

import {extractPrefixAndPostfix} from '../utils/extract-prefix-and-postfix';

/**
 * It replaces pseudo characters with valid one.
 * @example User types '.' (but separator is equal to comma) => dot is replaced with comma.
 * @example User types hyphen / en-dash / em-dash => it is replaced with minus.
 */
export function createPseudoCharactersPreprocessor({
    validCharacter,
    pseudoCharacters,
    prefix,
    postfix,
}: {
    validCharacter: string;
    pseudoCharacters: string[];
    prefix: string;
    postfix: string;
}): MaskitoPreprocessor {
    const pseudoCharactersRegExp = new RegExp(`[${pseudoCharacters.join('')}]`, 'gi');

    return ({elementState, data}) => {
        const {value, selection} = elementState;

        const {cleanValue, extractedPostfix, extractedPrefix} = extractPrefixAndPostfix({
            value,
            prefix,
            postfix,
        });

        const newValue =
            extractedPrefix +
            cleanValue.replace(pseudoCharactersRegExp, validCharacter) +
            extractedPostfix;

        return {
            elementState: {
                selection,
                value: newValue,
            },
            data: data.replace(pseudoCharactersRegExp, validCharacter),
        };
    };
}
