import {MaskitoPostprocessor} from '@maskito/core';

import {escapeRegExp, identity} from '../../../utils';
import {maskitoParseNumber} from '../utils';

/**
 * If `decimalZeroPadding` is `true`, it pads decimal part with zeroes
 * (until number of digits after decimalSeparator is equal to the `precision`).
 * @example 1,42 => (`precision` is equal to 4) => 1,4200.
 */
export function createDecimalZeroPaddingPostprocessor({
    decimalSeparator,
    precision,
    decimalZeroPadding,
    postfix,
}: {
    decimalSeparator: string;
    decimalZeroPadding: boolean;
    precision: number;
    postfix: string;
}): MaskitoPostprocessor {
    if (precision <= 0 || !decimalZeroPadding) {
        return identity;
    }

    const trailingPostfixRegExp = new RegExp(`${escapeRegExp(postfix)}$`);

    return ({value, selection}) => {
        if (Number.isNaN(maskitoParseNumber(value, decimalSeparator))) {
            return {value, selection};
        }

        const [integerPart, decimalPart = ''] = value
            .replace(trailingPostfixRegExp, '')
            .split(decimalSeparator);

        return {
            value:
                integerPart +
                decimalSeparator +
                decimalPart.padEnd(precision, '0') +
                postfix,
            selection,
        };
    };
}
