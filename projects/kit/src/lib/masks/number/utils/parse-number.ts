import {CHAR_EM_DASH, CHAR_EN_DASH, CHAR_HYPHEN, CHAR_MINUS} from '../../../constants';

export function maskitoParseNumber(
    maskedNumber: string,
    decimalSeparator: string = '.',
): number {
    const negativeSign = maskedNumber.match(
        new RegExp(`^[${CHAR_MINUS}\\${CHAR_HYPHEN}${CHAR_EN_DASH}${CHAR_EM_DASH}]`),
    );

    return Number(
        (negativeSign ? CHAR_HYPHEN : '') +
            maskedNumber
                .replace(new RegExp(`[^\\d\\${decimalSeparator}]`, 'g'), '')
                .replace(decimalSeparator, '.'),
    );
}
