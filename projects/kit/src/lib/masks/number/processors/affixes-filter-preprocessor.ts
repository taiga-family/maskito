import type {MaskitoPreprocessor} from '@maskito/core';

import type {MaskitoNumberParams} from '../number-params';
import {fromNumberParts, toNumberParts} from '../utils';

/**
 * It drops prefix and postfix from data
 * Needed for case, when prefix or postfix contain decimalSeparator, to ignore it in resulting number
 * @example User pastes '{prefix}123.45{postfix}' => 123.45
 */
export function createAffixesFilterPreprocessor(
    params: Pick<
        Required<MaskitoNumberParams>,
        | 'decimalPseudoSeparators'
        | 'decimalSeparator'
        | 'minusPseudoSigns'
        | 'minusSign'
        | 'negativePattern'
        | 'postfix'
        | 'prefix'
    >,
): MaskitoPreprocessor {
    return ({elementState, data}) => {
        const {value} = elementState;
        const {prefix, postfix, ...numberParts} = toNumberParts(data, params);

        return {
            elementState,
            data: fromNumberParts(
                {
                    ...numberParts,
                    prefix: value.startsWith(prefix) ? '' : prefix,
                    postfix: value.endsWith(postfix) ? '' : postfix,
                },
                params,
            ),
        };
    };
}
