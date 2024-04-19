import type {MaskitoPreprocessor} from '@maskito/core';

export function createClearInputPreprocessor({
    decimalSeparator,
    decimalZeroPadding,
    prefix,
    postfix,
    minusSign,
    precision,
}: {
    decimalSeparator: string;
    decimalZeroPadding: boolean;
    prefix: string;
    postfix: string;
    minusSign: string;
    precision: number;
}): MaskitoPreprocessor {
    return ({elementState, data}, inputType) => {
        if (!decimalZeroPadding || !inputType.includes('delete')) {
            return {elementState, data};
        }

        const {value, selection} = elementState;

        const [from, to] = getSelectionWithoutPrefixPostfix({
            value,
            selection,
            prefix,
            postfix,
        });

        const resultFrom = from + prefix.length;

        const [integerPart, decimalPart = ''] = getIntegerDecimalParts({
            selection: [from, to],
            value: valueWithoutPrefixPostfix({
                value: elementState.value,
                prefix,
                postfix,
            }),
            decimalSeparator,
            precision,
        });

        return ((from === 0 && integerPart === '') ||
            (from === minusSign.length && integerPart === minusSign)) &&
            !Number(decimalPart)
            ? {
                  elementState: {
                      value: prefix + integerPart + postfix,
                      selection: [resultFrom, resultFrom],
                  },
                  data,
              }
            : {
                  elementState: {
                      value:
                          prefix + integerPart + decimalSeparator + decimalPart + postfix,
                      selection: [resultFrom, resultFrom],
                  },
                  data,
              };
    };
}

function getSelectionWithoutPrefixPostfix({
    value,
    selection,
    prefix,
    postfix,
}: {
    value: string;
    selection: readonly [number, number];
    prefix: string;
    postfix: string;
}): [number, number] {
    const cleanValue = valueWithoutPrefixPostfix({value, prefix, postfix});

    let [from, to] = selection;

    from = from <= prefix.length ? 0 : from - prefix.length;
    to = to >= value.length - postfix.length ? cleanValue.length : to - prefix.length;

    return [from, to];
}

function valueWithoutPrefixPostfix({
    value,
    prefix,
    postfix,
}: {
    value: string;
    prefix: string;
    postfix: string;
}): string {
    return value.slice(prefix.length, value.length - postfix.length);
}

function getIntegerDecimalParts({
    value,
    selection,
    decimalSeparator,
    precision,
}: {
    value: string;
    selection: [number, number];
    decimalSeparator: string;
    precision: number;
}): [string, string] {
    const decimalSeparatorIndex = value.indexOf(decimalSeparator);
    const [from, to] = selection;

    if (from === to) {
        const [integerPart, decimalPart = ''] = value.split(decimalSeparator);

        return [integerPart, decimalPart];
    }

    if (from > decimalSeparatorIndex || to < decimalSeparatorIndex) {
        const [integerPart, decimalPart = ''] = (
            value.slice(0, from) + value.slice(to, value.length)
        ).split(decimalSeparator);

        return [
            integerPart,
            decimalPart.concat('0'.repeat(precision - decimalPart.length)),
        ];
    }

    const integerPart = value.slice(0, from);
    const decimalPart = value.slice(
        Math.max(decimalSeparatorIndex + 1, to),
        value.length,
    );

    return [integerPart, decimalPart?.concat('0'.repeat(precision - decimalPart.length))];
}
