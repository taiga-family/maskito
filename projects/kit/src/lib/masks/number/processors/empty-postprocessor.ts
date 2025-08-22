import type {MaskitoPostprocessor} from '@maskito/core';

import type {MaskitoNumberParams} from '../number-params';
import {fromNumberParts, toNumberParts} from '../utils';

/**
 * Make textfield empty if there is no integer part and all decimal digits are zeroes.
 * @example 0|,00 => Backspace => Empty.
 * @example -0|,00 => Backspace => -.
 * @example ,42| => Backspace x2 => ,|00 => Backspace => Empty
 */
export function emptyPostprocessor(
    params: Pick<
        Required<MaskitoNumberParams>,
        | 'decimalPseudoSeparators'
        | 'decimalSeparator'
        | 'minusPseudoSigns'
        | 'minusSign'
        | 'postfix'
        | 'prefix'
    >,
): MaskitoPostprocessor {
    return ({value, selection}) => {
        const [caretIndex] = selection;
        const {prefix, minus, integerPart, decimalSeparator, decimalPart, postfix} =
            toNumberParts(value, params);
        const aloneDecimalSeparator = !integerPart && !decimalPart && decimalSeparator;

        if (
            (!integerPart &&
                !Number(decimalPart) &&
                caretIndex === (minus + prefix).length) ||
            aloneDecimalSeparator
        ) {
            return {
                selection,
                value: fromNumberParts({prefix, minus, postfix}, params),
            };
        }

        return {value, selection};
    };
}
