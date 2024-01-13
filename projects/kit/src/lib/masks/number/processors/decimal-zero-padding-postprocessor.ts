import {MaskitoPostprocessor} from '@maskito/core';

import {identity} from '../../../utils';
import {maskitoParseNumber} from '../utils';
import {extractAffixes} from '../utils/extract-affixes';

/**
 * If `decimalZeroPadding` is `true`, it pads decimal part with zeroes
 * (until number of digits after decimalSeparator is equal to the `precision`).
 * @example 1,42 => (`precision` is equal to 4) => 1,4200.
 */
export function createDecimalZeroPaddingPostprocessor({
    decimalSeparator,
    precision,
    decimalZeroPadding,
    prefix,
    postfix,
}: {
    decimalSeparator: string;
    decimalZeroPadding: boolean;
    precision: number;
    prefix: string;
    postfix: string;
}): MaskitoPostprocessor {
    if (precision <= 0 || !decimalZeroPadding) {
        return identity;
    }

    return ({value, selection}) => {
        const {cleanValue, extractedPrefix, extractedPostfix} = extractAffixes(value, {
            prefix,
            postfix,
        });

        if (Number.isNaN(maskitoParseNumber(cleanValue, decimalSeparator))) {
            return {value, selection};
        }

        const [integerPart, decimalPart = ''] = cleanValue.split(decimalSeparator);

        return {
            value:
                extractedPrefix +
                integerPart +
                decimalSeparator +
                decimalPart.padEnd(precision, '0') +
                extractedPostfix,
            selection,
        };
    };
}
