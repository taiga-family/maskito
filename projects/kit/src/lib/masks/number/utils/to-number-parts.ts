import {escapeRegExp} from '../../../utils';

export function toNumberParts(
    value: string,
    {decimalSeparator, minusSign}: {decimalSeparator: string; minusSign: string},
): {minus: string; integerPart: string; decimalPart: string} {
    const [integerWithMinus = '', decimalPart = ''] = value.split(decimalSeparator);
    const escapedMinus = escapeRegExp(minusSign);
    const [, minus = '', integerPart = ''] =
        new RegExp(`^(?:[^\\d${escapedMinus}])?(${escapedMinus})?(.*)`).exec(
            integerWithMinus,
        ) || [];

    return {minus, integerPart, decimalPart};
}
