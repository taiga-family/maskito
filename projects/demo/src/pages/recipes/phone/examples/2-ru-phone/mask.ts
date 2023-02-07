import {MaskitoOptions} from '@maskito/core';

export default {
    mask: [
        '+',
        '7',
        ' ',
        '(',
        /\d/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
    ],
    // non-removable country prefix
    postprocessor: ({value, selection}, initialElementState) => {
        const countryPrefix = '+7 ';
        const minCaretIndex = countryPrefix.length;

        return value.length < minCaretIndex && initialElementState.value
            ? {selection: [minCaretIndex, minCaretIndex], value: countryPrefix}
            : {selection, value};
    },
} as MaskitoOptions;
