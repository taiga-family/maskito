const EXTRACT_MINUS_RE = /(\D)?(.*)/;

export function toNumberParts(
    value: string,
    decimalSeparator: string,
): {minus: string; integerPart: string; decimalPart: string} {
    const [integerWithMinus = '', decimalPart = ''] = value.split(decimalSeparator);
    const [, minus = '', integerPart = ''] =
        integerWithMinus.match(EXTRACT_MINUS_RE) || [];

    return {minus, integerPart, decimalPart};
}
