import type {MaskitoPostprocessor} from '@maskito/core';

import {extractAffixes, identity} from '../../../utils';
import {maskitoParseNumber} from '../utils';

/**
 * If `minimumFractionDigits` is `>0`, it pads decimal part with zeroes
 * (until number of digits after decimalSeparator is equal to the `minimumFractionDigits`).
 * @example 1,42 => (`minimumFractionDigits` is equal to 4) => 1,4200.
 */
export function createDecimalZeroPaddingPostprocessor({
    decimalSeparator,
    minimumFractionDigits,
    prefix,
    postfix,
    minusSign,
}: {
    decimalSeparator: string;
    minimumFractionDigits: number;
    prefix: string;
    postfix: string;
    minusSign: string;
}): MaskitoPostprocessor {
    if (!minimumFractionDigits) {
        return identity;
    }

    return ({value, selection}) => {
        const {cleanValue, extractedPrefix, extractedPostfix} = extractAffixes(value, {
            prefix,
            postfix,
        });

        if (Number.isNaN(maskitoParseNumber(cleanValue, {decimalSeparator, minusSign}))) {
            return {value, selection};
        }

        const [integerPart, decimalPart = ''] = cleanValue.split(decimalSeparator);

        return {
            value:
                extractedPrefix +
                integerPart +
                decimalSeparator +
                decimalPart.padEnd(minimumFractionDigits, '0') +
                extractedPostfix,
            selection,
        };
    };
}
