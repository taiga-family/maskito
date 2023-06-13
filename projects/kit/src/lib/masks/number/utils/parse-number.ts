import {CHAR_EM_DASH, CHAR_EN_DASH, CHAR_HYPHEN, CHAR_MINUS} from '../../../constants';
import {escapeRegExp} from '../../../utils';

export function maskitoParseNumber(
    maskedNumber: string,
    decimalSeparator: string = '.',
): number {
    const hasNegativeSign = !!maskedNumber.match(
        new RegExp(`^\\D*[${CHAR_MINUS}\\${CHAR_HYPHEN}${CHAR_EN_DASH}${CHAR_EM_DASH}]`),
    );
    const unmaskedNumber = maskedNumber
        .replace(new RegExp(`[^\\d${escapeRegExp(decimalSeparator)}]`, 'g'), '')
        .replace(decimalSeparator, '.');

    return unmaskedNumber
        ? Number((hasNegativeSign ? CHAR_HYPHEN : '') + unmaskedNumber)
        : NaN;
}
