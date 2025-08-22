import type {MaskitoPreprocessor} from '@maskito/core';

import {clamp, escapeRegExp} from '../../../utils';
import type {MaskitoNumberParams} from '../number-params';
import {fromNumberParts, toNumberParts} from '../utils';

/**
 * It pads integer part with zero if user types decimal separator (for empty input).
 * @example Empty input => User types "," (decimal separator) => 0,|
 */
export function createNotEmptyIntegerPartPreprocessor(
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
    const startWithDecimalSepRegExp = new RegExp(
        `^\\D*${escapeRegExp(decimalSeparator)}`,
    );

    return ({elementState, data}) => {
        const {value, selection} = elementState;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {prefix, postfix, ...numberParts} = toNumberParts(value, params);
        const onlyNumber = fromNumberParts(numberParts, params);
        const [from, to] = selection;
        const cleanFrom = clamp(from - prefix.length, 0, onlyNumber.length);
        const cleanTo = clamp(to - prefix.length, 0, onlyNumber.length);

        if (
            maximumFractionDigits <= 0 ||
            onlyNumber.slice(0, cleanFrom).includes(decimalSeparator) ||
            onlyNumber.slice(cleanTo).includes(decimalSeparator) ||
            !data.match(startWithDecimalSepRegExp)
        ) {
            return {elementState, data};
        }

        const digitsBeforeCursor = /\d+/.exec(onlyNumber.slice(0, cleanFrom));

        return {
            elementState,
            data: digitsBeforeCursor ? data : `0${data}`,
        };
    };
}
