import type {MaskitoPostprocessor} from '@maskito/core';

import {extractAffixes} from '../../../utils';
import {toNumberParts} from '../utils';

/**
 * Make textfield empty if there is no integer part and all decimal digits are zeroes.
 * @example 0|,00 => Backspace => Empty.
 * @example -0|,00 => Backspace => -.
 * @example ,42| => Backspace x2 => ,|00 => Backspace => Empty
 */
export function emptyPostprocessor({
    prefix,
    postfix,
    decimalSeparator,
}: {
    prefix: string;
    postfix: string;
    decimalSeparator: string;
}): MaskitoPostprocessor {
    return ({value, selection}) => {
        const [caretIndex] = selection;
        const {cleanValue, extractedPrefix, extractedPostfix} = extractAffixes(value, {
            prefix,
            postfix,
        });
        const {minus, integerPart, decimalPart} = toNumberParts(
            cleanValue,
            decimalSeparator,
        );
        const aloneDecimalSeparator =
            !integerPart && !decimalPart && cleanValue.includes(decimalSeparator);

        if (
            (!integerPart &&
                !Number(decimalPart) &&
                caretIndex === (minus + extractedPrefix).length) ||
            aloneDecimalSeparator
        ) {
            return {
                selection,
                value: extractedPrefix + minus + extractedPostfix,
            };
        }

        return {value, selection};
    };
}
