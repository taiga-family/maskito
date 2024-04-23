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
        integerWithMinus.match(
            new RegExp(`([^\\d${escapeRegExp(thousandSeparator)}]+)?(.*)`),
        ) || [];

    return {minus, integerPart, decimalPart};
}
