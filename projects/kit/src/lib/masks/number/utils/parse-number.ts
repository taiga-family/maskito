import {CHAR_HYPHEN} from '../../../constants';
import {escapeRegExp} from '../../../utils';
import {DEFAULT_PSEUDO_MINUSES} from '../number-mask';
import type {MaskitoNumberParams} from '../number-params';

export function maskitoParseNumber(
    maskedNumber: string,
    // TODO(v4): decimalSeparatorOrParams: MaskitoNumberParams | string => params: MaskitoNumberParams = {}
    decimalSeparatorOrParams: MaskitoNumberParams | string = {},
): number {
    const {decimalSeparator = '.', minusSign = ''}: MaskitoNumberParams =
        typeof decimalSeparatorOrParams === 'string'
            ? {decimalSeparator: decimalSeparatorOrParams}
            : decimalSeparatorOrParams;
    const hasNegativeSign = !!new RegExp(
        `^\\D*[${escapeRegExp(minusSign)}\\${DEFAULT_PSEUDO_MINUSES.join('\\')}]`,
    ).exec(maskedNumber);
    const escapedDecimalSeparator = escapeRegExp(decimalSeparator);

    const unmaskedNumber = maskedNumber
        // drop all decimal separators not followed by a digit
        .replaceAll(new RegExp(`${escapedDecimalSeparator}(?!\\d)`, 'g'), '')
        // drop all non-digit characters except decimal separator
        .replaceAll(new RegExp(`[^\\d${escapedDecimalSeparator}]`, 'g'), '')
        .replace(decimalSeparator, decimalSeparator && '.');

    if (unmaskedNumber) {
        const sign = hasNegativeSign ? CHAR_HYPHEN : '';

        return Number(`${sign}${unmaskedNumber}`);
    }

    return NaN;
}
