import {MaskitoOptions} from '@maskito/core';
import {MaskitoTimeMode} from '../types';

export function createZeroPlaceholdersPreprocessor(
    mode: MaskitoTimeMode,
): NonNullable<MaskitoOptions['preprocessor']> {
    return ({elementState, actionType}) => {
        const {value, selection} = elementState;
        const [from, to] = selection;

        if (actionType === 'validation' || (actionType === 'insert' && from === to)) {
            return {
                elementState: {selection, value: padZeroes(value, mode)},
            };
        }

        const zeroes = value.slice(from, to).replace(/\d/g, '0');
        const newValue = value.slice(0, from) + zeroes + value.slice(to);
        const newValueWithZeroPlaceholders = padZeroes(newValue, mode);

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

function padZeroes(value: string, timeMode: MaskitoTimeMode): string {
    let paddiedValue = value;

    while (paddiedValue.length < timeMode.length) {
        const char = timeMode[paddiedValue.length];

        paddiedValue += char.match(/\w/) ? '0' : char;
    }

    return paddiedValue;
}
