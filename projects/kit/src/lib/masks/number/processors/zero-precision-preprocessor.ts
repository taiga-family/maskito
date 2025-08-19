import type {MaskitoPreprocessor} from '@maskito/core';

import {escapeRegExp, identity} from '../../../utils';
import type {MaskitoNumberParams} from '../number-params';
import {fromNumberParts, toNumberParts} from '../utils';

/**
 * It drops decimal part if `maximumFractionDigits` is zero.
 * @example User pastes '123.45' (but `maximumFractionDigits` is zero) => 123
 */
export function createZeroPrecisionPreprocessor(
    params: Pick<
        Required<MaskitoNumberParams>,
        | 'decimalPseudoSeparators'
        | 'decimalSeparator'
        | 'maximumFractionDigits'
        | 'minusPseudoSigns'
        | 'minusSign'
        | 'postfix'
        | 'prefix'
    >,
): MaskitoPreprocessor {
    const {maximumFractionDigits, decimalSeparator} = params;

    if (
        maximumFractionDigits > 0 ||
        !decimalSeparator // all separators should be treated only as thousand separators
    ) {
        return identity;
    }

    const decimalPartRegExp = new RegExp(`${escapeRegExp(decimalSeparator)}.*$`, 'g');

    return ({elementState, data}) => {
        const {value, selection} = elementState;
        const {prefix, postfix, ...numberParts} = toNumberParts(value, params);
        const [from, to] = selection;
        const onlyNumber = fromNumberParts(numberParts, params).replace(
            decimalPartRegExp,
            '',
        );
        const newValue = fromNumberParts(
            {...toNumberParts(onlyNumber, params), prefix, postfix},
            params,
        );

        return {
            elementState: {
                selection: [
                    Math.min(from, newValue.length),
                    Math.min(to, newValue.length),
                ],
                value: newValue,
            },
            data: data.replace(decimalPartRegExp, ''),
        };
    };
}
