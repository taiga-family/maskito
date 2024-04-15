import type {MaskitoPreprocessor} from '@maskito/core';
import {ElementState} from 'projects/core/src/lib/types';

export function createClearInputPreprocessor(
    decimalSeparator: string,
    decimalZeroPadding: boolean,
): MaskitoPreprocessor {
    return ({elementState, data}, inputType) => {
        if (inputType === 'deleteBackward' || inputType === 'deleteForward') {
            const [start] = elementState.selection;
            const [integerPart, decimalPart] = getIntegerDecimalParts(
                elementState,
                decimalSeparator,
                decimalZeroPadding,
            );

            return start === 0 && !integerPart && Number(decimalPart) === 0
                ? {
                      elementState: {
                          value: '',
                          selection: [0, 0],
                      },
                      data,
                  }
                : {
                      elementState: {
                          value: integerPart + decimalSeparator + decimalPart,
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
): [string, string] {
    const decimalSeparatorIndex = value.indexOf(decimalSeparator);
    const [start, end] = selection;

    if (start === end && start === decimalSeparatorIndex) {
        return value.split(decimalSeparator) as [string, string];
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
        value.slice(end, value.length) + '0'.repeat(end - decimalSeparatorIndex - 1);

    return [integerPart, decimalPart];
}
