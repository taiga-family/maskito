import type {MaskitoPostprocessor} from '@maskito/core';

import {identity} from '../../../utils';
import type {MaskitoNumberParams} from '../number-params';
import {fromNumberParts, maskitoParseNumber, toNumberParts} from '../utils';

/**
 * If `minimumFractionDigits` is `>0`, it pads decimal part with zeroes
 * (until number of digits after decimalSeparator is equal to the `minimumFractionDigits`).
 * @example 1,42 => (`minimumFractionDigits` is equal to 4) => 1,4200.
 */
export function createDecimalZeroPaddingPostprocessor(
    params: Pick<
        Required<MaskitoNumberParams>,
        | 'decimalPseudoSeparators'
        | 'decimalSeparator'
        | 'minimumFractionDigits'
        | 'minusPseudoSigns'
        | 'minusSign'
        | 'negativePattern'
        | 'postfix'
        | 'prefix'
    >,
): MaskitoPostprocessor {
    const {minimumFractionDigits} = params;

    if (!minimumFractionDigits) {
        return identity;
    }

    return ({value, selection}) => {
        if (Number.isNaN(maskitoParseNumber(value, params))) {
            return {value, selection};
        }

        const {decimalPart, ...numberParts} = toNumberParts(value, params);

        return {
            value: fromNumberParts(
                {
                    ...numberParts,
                    decimalPart: decimalPart.padEnd(minimumFractionDigits, '0'),
                },
                params,
            ),
            selection,
        };
    };
}
