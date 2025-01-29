import {
    CHAR_EM_DASH,
    CHAR_EN_DASH,
    CHAR_HYPHEN,
    CHAR_JP_HYPHEN,
    CHAR_MINUS,
} from '../../../constants';
import {escapeRegExp} from '../../../utils';

export function maskitoParseNumber(maskedNumber: string, decimalSeparator = '.'): number {
    const hasNegativeSign = !!new RegExp(
        `^\\D*[${CHAR_MINUS}\\${CHAR_HYPHEN}${CHAR_EN_DASH}${CHAR_EM_DASH}${CHAR_JP_HYPHEN}]`,
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
