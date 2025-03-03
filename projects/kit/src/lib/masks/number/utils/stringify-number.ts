import {clamp} from '../../../utils';
import type {MaskitoNumberParams} from '../number-params';

export function maskitoStringifyNumber(
    number: number,
    {
        max = Number.MAX_SAFE_INTEGER,
        min = Number.MIN_SAFE_INTEGER,
        precision = 0,
        thousandSeparator,
        decimalSeparator = '.',
        decimalZeroPadding,
        prefix = '',
        postfix = '',
        minusSign = '-',
    }: MaskitoNumberParams,
): string {
    if (Number.isNaN(number) || number === null) {
        return '';
    }

    const validatedNumber = clamp(number, min, max);

    const isNegative = validatedNumber < 0;
    const absNumber = Math.abs(validatedNumber);

    let [integerPart = '', decimalPart = ''] = absNumber.toFixed(precision).split('.');

    if (thousandSeparator) {
        integerPart = integerPart.replaceAll(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
    }

    if (precision > 0) {
        if (decimalPart ?? decimalZeroPadding) {
            decimalPart = decimalSeparator + decimalPart;
        }
    }

    let result = integerPart + decimalPart;

    if (isNegative) {
        result = minusSign + result;
    }

    return prefix + result + postfix;
}
