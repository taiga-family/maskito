import type {MaskitoPreprocessor} from '@maskito/core';

export function createZeroPlaceholdersPreprocessor(postfix = ''): MaskitoPreprocessor {
    const isLastChar = (value: string, [_, to]: readonly [number, number]): boolean =>
        to >= value.length - postfix.length;

    return ({elementState}, actionType) => {
        const {value, selection} = elementState;

        if (!value || isLastChar(value, selection)) {
            return {elementState};
        }

        const [from, to] = selection;

        const zeroes = value.slice(from, to).replaceAll(/\d/g, '0');
        const newValue = value.slice(0, from) + zeroes + value.slice(to);

        if (!zeroes.replaceAll(/\D/g, '')) {
            return {elementState};
        }

        if (actionType === 'validation' || (actionType === 'insert' && from === to)) {
            return {elementState: {selection, value: newValue}};
        }

        return {
            elementState: {
                selection:
                    actionType === 'deleteBackward' || actionType === 'insert'
                        ? [from, from]
                        : [to, to],
                value: newValue,
            },
        };
    };
}
