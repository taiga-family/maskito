import {escapeRegExp} from '../../../utils';

export function toNumberParts(
    value: string,
    {
        decimalSeparator,
        thousandSeparator,
    }: {decimalSeparator: string; thousandSeparator: string},
): {minus: string; integerPart: string; decimalPart: string} {
    const [integerWithMinus = '', decimalPart = ''] = value.split(decimalSeparator);
    const [, minus = '', integerPart = ''] =
        new RegExp(`([^\\d${escapeRegExp(thousandSeparator)}]+)?(.*)`).exec(
            integerWithMinus,
        ) || [];

    return {minus, integerPart, decimalPart};
}
