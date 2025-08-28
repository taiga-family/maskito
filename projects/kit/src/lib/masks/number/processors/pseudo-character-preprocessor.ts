import type {MaskitoPreprocessor} from '@maskito/core';

import type {MaskitoNumberParams} from '../number-params';
import {fromNumberParts, toNumberParts} from '../utils';

/**
 * It replaces pseudo characters with valid one.
 * @example User types '.' (but separator is equal to comma) => dot is replaced with comma.
 * @example User types hyphen / en-dash / em-dash => it is replaced with minus.
 */
export function createPseudoCharactersPreprocessor({
    validCharacter,
    pseudoCharacters,
    ...params
}: Pick<
    Required<MaskitoNumberParams>,
    | 'decimalPseudoSeparators'
    | 'decimalSeparator'
    | 'minusPseudoSigns'
    | 'minusSign'
    | 'negativePattern'
    | 'postfix'
    | 'prefix'
> & {
    validCharacter: string;
    pseudoCharacters: readonly string[];
}): MaskitoPreprocessor {
    const pseudoCharactersRegExp = new RegExp(`[${pseudoCharacters.join('')}]`, 'gi');

    return ({elementState, data}) => {
        const {value, selection} = elementState;
        const {prefix, postfix, ...numberParts} = toNumberParts(value, params);
        const onlyNumber = fromNumberParts(numberParts, params).replace(
            pseudoCharactersRegExp,
            validCharacter,
        );

        return {
            elementState: {
                selection,
                value: fromNumberParts(
                    {
                        ...toNumberParts(onlyNumber, params),
                        prefix,
                        postfix,
                    },
                    params,
                ),
            },
            data: data.replace(pseudoCharactersRegExp, validCharacter),
        };
    };
}
