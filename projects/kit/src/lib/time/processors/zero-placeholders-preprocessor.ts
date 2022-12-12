import {MaskitoOptions} from '@maskito/core';

export const zeroPlaceholdersPreprocessor: NonNullable<
    MaskitoOptions['preprocessor']
> = ({elementState, actionType}) => {
    if (actionType !== 'deleteBackward' && actionType !== 'deleteForward') {
        return {elementState};
    }

    const {value, selection} = elementState;
    const isForward = actionType === 'deleteForward';
    const [from, to] = selection;
    const zeroes = to < value.length ? value.slice(from, to).replace(/\d/g, '0') : '';

    return {
        elementState: {
            selection: isForward ? [to, to] : [from, from],
            value: value.slice(0, from) + zeroes + value.slice(to),
        },
    };
};
