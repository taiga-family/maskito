import type {MaskitoPreprocessor} from '@maskito/core';
import type {ElementState, SelectionRange} from 'projects/core/src/lib/types';

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
        if (
            !decimalZeroPadding ||
            !['deleteBackward', 'deleteForward'].includes(inputType)
        ) {
            return {elementState, data};
        }

        const [start, end] = getSelectionWithoutPrefixPostfix({
            elementState,
            prefix,
            postfix,
        });

        const resultStart = start + prefix.length;

        const [integerPart, decimalPart = ''] = getIntegerDecimalParts({
            elementState: {
                selection: [start, end],
                value: valueWithoutPrefixPostfix({
                    value: elementState.value,
                    prefix,
                    postfix,
                }),
            },
            decimalSeparator,
            precision,
        });

        return ((start === 0 && integerPart === '') ||
            (start === minusSign.length && integerPart === minusSign)) &&
            !Number(decimalPart)
            ? {
                  elementState: {
                      value: prefix + integerPart + postfix,
                      selection: [resultStart, resultStart],
                  },
                  data,
              }
            : {
                  elementState: {
                      value:
                          prefix + integerPart + decimalSeparator + decimalPart + postfix,
                      selection: [resultStart, resultStart],
                  },
                  data,
              };
    };
}

function getSelectionWithoutPrefixPostfix({
    elementState,
    prefix,
    postfix,
}: {
    elementState: ElementState;
    prefix: string;
    postfix: string;
}): SelectionRange {
    const {value, selection} = elementState;
    const cleanValue = valueWithoutPrefixPostfix({value, prefix, postfix});

    let [start, end] = selection;

    start = start <= prefix.length ? 0 : start - prefix.length;
    end = end >= value.length - postfix.length ? cleanValue.length : end - prefix.length;

    return [start, end];
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
    elementState,
    decimalSeparator,
    precision,
}: {
    elementState: ElementState;
    decimalSeparator: string;
    precision: number;
}): [string, string] {
    const {value, selection} = elementState;
    const decimalSeparatorIndex = value.indexOf(decimalSeparator);
    const [start, end] = selection;

    if (start === end) {
        const [integerPart, decimalPart = ''] = value.split(decimalSeparator);

        return [integerPart, decimalPart];
    }

    if (start > decimalSeparatorIndex || end < decimalSeparatorIndex) {
        const [integerPart, decimalPart = ''] = (
            value.slice(0, start) + value.slice(end, value.length)
        ).split(decimalSeparator);

        return [
            integerPart,
            decimalPart.concat('0'.repeat(precision - decimalPart.length)),
        ];
    }

    const integerPart = value.slice(0, start);
    const decimalPart = value.slice(
        Math.max(decimalSeparatorIndex + 1, end),
        value.length,
    );

    return [integerPart, decimalPart?.concat('0'.repeat(precision - decimalPart.length))];
}
