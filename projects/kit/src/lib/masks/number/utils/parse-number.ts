import {
    CHAR_HYPHEN,
    CHAR_MINUS,
    CHAR_NO_BREAK_SPACE,
    DEFAULT_PSEUDO_MINUSES,
} from '../../../constants';
import {escapeRegExp} from '../../../utils';
import type {MaskitoNumberParams} from '../number-params';

export function maskitoParseNumber(
    maskedNumber: string,
    params?: MaskitoNumberParams & {bigint?: false},
): number;

export function maskitoParseNumber(
    maskedNumber: string,
    params?: MaskitoNumberParams & {bigint: true},
): bigint | null;

export function maskitoParseNumber(
    maskedNumber: string,
    params?: MaskitoNumberParams & {bigint: boolean},
): bigint | number | null;

export function maskitoParseNumber(
    maskedNumber: string,
    {
        bigint = false,
        decimalSeparator = '.',
        maximumFractionDigits = 0,
        minusPseudoSigns = DEFAULT_PSEUDO_MINUSES,
        minusSign = CHAR_MINUS,
        thousandSeparator = CHAR_NO_BREAK_SPACE,
    }: MaskitoNumberParams & {bigint?: boolean} = {},
): bigint | number | null {
    const hasNegativeSign = !!new RegExp(
        `^\\D*[${escapeRegExp(minusSign)}\\${minusPseudoSigns.join('\\')}]`,
    ).exec(maskedNumber);
    const escapedDecimalSeparator = escapeRegExp(decimalSeparator);

    const unmaskedNumber = maskedNumber
        // drop all decimal separators not followed by a digit
        .replaceAll(new RegExp(`${escapedDecimalSeparator}(?!\\d)`, 'g'), '')
        // drop all non-digit characters except decimal separator
        .replaceAll(
            new RegExp(
                `[^\\d${maximumFractionDigits <= 0 && decimalSeparator === thousandSeparator ? '' : escapedDecimalSeparator}]`,
                'g',
            ),
            '',
        )
        .replace(decimalSeparator, decimalSeparator && '.');

    if (unmaskedNumber) {
        const sign = hasNegativeSign ? CHAR_HYPHEN : '';

        return bigint
            ? BigInt(`${sign}${unmaskedNumber}`)
            : Number(`${sign}${unmaskedNumber}`);
    }

    return bigint ? null : NaN;
}
