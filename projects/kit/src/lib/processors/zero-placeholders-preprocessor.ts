import {MaskitoOptions, MaskPreprocessorAction} from '@maskito/core';

export function createZeroPlaceholdersPreprocessor(): NonNullable<
    MaskitoOptions['preprocessor']
> {
    return ({elementState}, actionType) => {
        const {value, selection} = elementState;

        if (!value || isLastChar(value, selection)) {
            return {elementState};
        }

        const [from, to] = selection;

        const zeroes = value.slice(from, to).replace(/\d/g, '0');
        const newValue = value.slice(0, from) + zeroes + value.slice(to);

        if (
            actionType === MaskPreprocessorAction.Validation ||
            (actionType === MaskPreprocessorAction.Insert && from === to)
        ) {
            return {
                elementState: {selection, value: newValue},
            };
        }

        return {
            elementState: {
                selection:
                    actionType === MaskPreprocessorAction.DeleteBackward ||
                    actionType === MaskPreprocessorAction.Insert
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
