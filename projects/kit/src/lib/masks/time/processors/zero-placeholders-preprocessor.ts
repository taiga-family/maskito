import {MaskitoOptions} from '@maskito/core';

import {MaskitoTimeMode} from '../types';

export function createZeroPlaceholdersPreprocessor(
    mode: MaskitoTimeMode,
): NonNullable<MaskitoOptions['preprocessor']> {
    return ({elementState}, actionType) => {
        const {value, selection} = elementState;
        const [from, to] = selection;

        if (actionType === 'validation' || (actionType === 'insert' && from === to)) {
            return {
                elementState: {selection, value: padWithZeroes(value, mode)},
            };
        }

        const zeroes = value.slice(from, to).replace(/\d/g, '0');
        const newValue = value.slice(0, from) + zeroes + value.slice(to);
        const newValueWithZeroPlaceholders = padWithZeroes(newValue, mode);

        return {
            elementState: {
                selection:
                    actionType === 'deleteBackward' || actionType === 'insert'
                        ? [from, from]
                        : [to, to],
                value: newValueWithZeroPlaceholders,
            },
        };
    };
}

function padWithZeroes(value: string, timeMode: MaskitoTimeMode): string {
    let paddedValue = value;

    while (paddedValue.length < timeMode.length) {
        const char = timeMode[paddedValue.length];

        paddedValue += char.match(/\w/) ? '0' : char;
    }

    return paddedValue;
}
