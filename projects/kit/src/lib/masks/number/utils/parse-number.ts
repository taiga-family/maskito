import {CHAR_HYPHEN} from '../../../constants';
import {type MaskitoNumberParams} from '../number-params';
import {fromNumberParts, toNumberParts} from './number-parts';
import {withNumberDefaults} from './with-number-defaults';

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
    {bigint = false, ...optionalParams}: MaskitoNumberParams & {bigint?: boolean} = {},
): bigint | number | null {
    const params = withNumberDefaults(optionalParams);
    const {minus, integerPart, decimalSeparator, ...numberParts} = toNumberParts(
        maskedNumber,
        params,
    );
    const unmaskedNumber = fromNumberParts(
        {
            ...numberParts,
            integerPart: integerPart.replaceAll(/\D/g, ''),
            decimalSeparator: decimalSeparator && '.',
            prefix: '',
            postfix: '',
            minus: '',
        },
        {...params, decimalSeparator: '.'},
    );

    if (unmaskedNumber) {
        const sign = minus ? CHAR_HYPHEN : '';

        return bigint
            ? BigInt(`${sign}${unmaskedNumber}`)
            : Number(`${sign}${unmaskedNumber}`);
    }

    return bigint ? null : Number.NaN;
}
