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
                elementState: {selection, value: value.padEnd(mode.length, '0')},
            };
        }

        const zeroes = value.slice(from, to).replace(/\d/g, '0');
        const newValue = value.slice(0, from) + zeroes + value.slice(to);
        const newValueWithZeroPlaceholders = newValue.padEnd(mode.length, '0');

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
