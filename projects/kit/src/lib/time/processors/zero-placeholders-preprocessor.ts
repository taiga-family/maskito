import {MaskitoOptions} from '@maskito/core';

export const zeroPlaceholdersPreprocessor: NonNullable<
    MaskitoOptions['preprocessor']
> = ({elementState, data, actionType}) => {
    const {value, selection} = elementState;
    const [from, to] = selection;

    if (actionType === 'validation' || (actionType === 'insert' && from === to)) {
        return {elementState};
    }

    const zeroes = to < value.length ? value.slice(from, to).replace(/\d/g, '0') : '';
    const newValue = value.slice(0, from) + zeroes + value.slice(to);

    if (actionType === 'insert') {
        const selectedCharAmount = to - from;

        return {
            data: data.padEnd(selectedCharAmount, '0'),
            elementState: {
                selection: [from, from],
                value: newValue,
            },
        };
    }

    return {
        elementState: {
            selection: actionType === 'deleteForward' ? [to, to] : [from, from],
            value: newValue,
        },
    };
};
