import type {MaskitoPreprocessor} from '@maskito/core';
import {ElementState, SelectionRange} from 'projects/core/src/lib/types';

export function createClearInputPreprocessor({
    decimalSeparator,
    decimalZeroPadding,
    prefix,
    postfix,
    minusSign,
}: {
    decimalSeparator: string;
    decimalZeroPadding: boolean;
    prefix: string;
    postfix: string;
    minusSign: string;
}): MaskitoPreprocessor {
    return ({elementState, data}, inputType) => {
        if (
            (inputType === 'deleteBackward' || inputType === 'deleteForward') &&
            decimalZeroPadding
        ) {
            const [start, end] = getSelectionWithoutPrefixPostfix(
                elementState,
                prefix,
                postfix,
            );

            const resultStart = start + prefix.length;

            const [integerPart, decimalPart = ''] = getIntegerDecimalParts(
                {
                    selection: [start, end],
                    value: valueWithoutPrefixPostfix(elementState.value, prefix, postfix),
                },
                decimalSeparator,
                decimalZeroPadding,
            );

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
                              prefix +
                              integerPart +
                              decimalSeparator +
                              decimalPart +
                              postfix,
                          selection: [resultStart, resultStart],
                      },
                      data,
                  };
        }

        return {elementState, data};
    };
}

function getSelectionWithoutPrefixPostfix(
    {value, selection}: ElementState,
    prefix: string,
    postfix: string,
): SelectionRange {
    const cleanValue = valueWithoutPrefixPostfix(value, prefix, postfix);

    let [start, end] = selection;

    start = start <= prefix.length ? 0 : start - prefix.length;
    end = end >= value.length - postfix.length ? cleanValue.length : end - prefix.length;

    return [start, end];
}

function valueWithoutPrefixPostfix(
    value: string,
    prefix: string,
    postfix: string,
): string {
    return value.slice(prefix.length, value.length - postfix.length);
}

function getIntegerDecimalParts(
    {value, selection}: ElementState,
    decimalSeparator: string,
    decimalZeroPadding: boolean,
): [string, string] {
    const decimalSeparatorIndex = value.indexOf(decimalSeparator);
    const [start, end] = selection;

    if (start === end) {
        const [integerPart, decimalPart = ''] = value.split(decimalSeparator);

        return [integerPart, decimalPart];
    }

    if (end < decimalSeparatorIndex) {
        const [integerPart, decimalPart = ''] = (
            value.slice(0, start) + value.slice(end, value.length)
        ).split(decimalSeparator);

        return [integerPart, decimalPart];
    }

    if (start > decimalSeparatorIndex) {
        const [integerPart, decimalPart] = (
            value.slice(0, start) +
            value.slice(end, value.length) +
            (decimalZeroPadding ? '0'.repeat(end - start) : '')
        ).split(decimalSeparator);

        return [integerPart, decimalPart];
    }

    const integerPart = value.slice(0, start);
    const decimalPart =
        value.slice(Math.max(decimalSeparatorIndex + 1, end), value.length) +
        '0'.repeat(Math.max(end - decimalSeparatorIndex - 1, 0));

    return [integerPart, decimalPart];
}
