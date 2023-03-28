import {MaskitoOptions} from '@maskito/core';
import {maskitoPrefixPostprocessorGenerator} from '@maskito/kit';

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
    postprocessor: maskitoPrefixPostprocessorGenerator('+7 '),
} as MaskitoOptions;
