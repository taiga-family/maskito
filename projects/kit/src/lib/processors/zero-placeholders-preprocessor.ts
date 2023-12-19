import {MaskitoPreprocessor} from '@maskito/core';

export function createZeroPlaceholdersPreprocessor(): MaskitoPreprocessor {
    return ({elementState}, {eventName, inputType}) => {
        const {value, selection} = elementState;

        if (!value || isLastChar(value, selection)) {
            return {elementState};
        }

        const [from, to] = selection;

        const zeroes = value.slice(from, to).replace(/\d/g, '0');
        const newValue = value.slice(0, from) + zeroes + value.slice(to);

        if (
            eventName !== 'beforeinput' ||
            (inputType.includes('insert') && from === to)
        ) {
            return {
                elementState: {selection, value: newValue},
            };
        }

        return {
            elementState: {
                selection:
                    (inputType.includes('delete') && inputType.includes('Backward')) ||
                    inputType.includes('insert')
                        ? [from, from]
                        : [to, to],
                value: newValue,
            },
        };
    };
}

function isLastChar(value: string, [_, to]: readonly [number, number]): boolean {
    return to === value.length;
}
