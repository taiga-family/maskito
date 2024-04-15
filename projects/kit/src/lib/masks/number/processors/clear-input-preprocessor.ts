import type {MaskitoPreprocessor} from '@maskito/core';
import {ElementState} from 'projects/core/src/lib/types';

export function createClearInputPreprocessor({
    decimalSeparator,
    decimalZeroPadding,
    prefix,
    postfix,
}: {
    decimalSeparator: string;
    decimalZeroPadding: boolean;
    prefix: string;
    postfix: string;
}): MaskitoPreprocessor {
    return ({elementState, data}, inputType) => {
        if (inputType === 'deleteBackward' || inputType === 'deleteForward') {
            const [start] = elementState.selection;
            const startWithoutPrefix = start - prefix.length;

            const [integerPart, decimalPart] = getIntegerDecimalParts(
                elementState,
                decimalSeparator,
                decimalZeroPadding,
                prefix,
                postfix,
            );

            return startWithoutPrefix === 0 && !integerPart && Number(decimalPart) === 0
                ? {
                      elementState: {
                          value: prefix + postfix,
                          selection: [start, start],
                      },
                      data,
                  }
                : {
                      elementState: {
                          value:
                              prefix +
                              integerPart +
                              (!decimalZeroPadding || decimalPart === ''
                                  ? ''
                                  : decimalSeparator) +
                              decimalPart +
                              postfix,
                          selection: [start, start],
                      },
                      data,
                  };
        }

        return {elementState, data};
    };
}

function getIntegerDecimalParts(
    {value, selection}: ElementState,
    decimalSeparator: string,
    decimalZeroPadding: boolean,
    prefix: string,
    postfix: string,
): [string, string] {
    const cleanValue = value.slice(prefix.length, value.length - postfix.length);
    const decimalSeparatorIndex = cleanValue.indexOf(decimalSeparator);
    let [start, end] = selection;

    start -= prefix.length;
    end -= prefix.length;

    if (start === end) {
        const [integerPart, decimalPart = ''] = cleanValue.split(decimalSeparator);

        return [integerPart, decimalPart];
    }

    if (end < decimalSeparatorIndex) {
        const [integerPart, decimalPart = ''] = (
            cleanValue.slice(0, start) + cleanValue.slice(end, cleanValue.length)
        ).split(decimalSeparator);

        return [integerPart, decimalPart];
    }

    if (start > decimalSeparatorIndex) {
        const [integerPart, decimalPart] = (
            cleanValue.slice(0, start) +
            cleanValue.slice(end, cleanValue.length) +
            (decimalZeroPadding ? '0'.repeat(end - start) : '')
        ).split(decimalSeparator);

        return [integerPart, decimalPart];
    }

    const integerPart = cleanValue.slice(0, start);
    const decimalPart =
        cleanValue.slice(end, cleanValue.length) +
        '0'.repeat(Math.max(end - decimalSeparatorIndex - 1, 0));

    return [integerPart, decimalPart];
}
