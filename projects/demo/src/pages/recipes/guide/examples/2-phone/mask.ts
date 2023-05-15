import {MaskitoOptions, maskitoPipe} from '@maskito/core';
import {maskitoPrefixPostprocessorGenerator, maskitoWithGuide} from '@maskito/kit';

/**
 * It is better to use en quad for placeholder characters
 * instead of simple space.
 * @see https://symbl.cc/en/2000
 */
export const GUIDE = '+  (   ) ___-____';
export const {
    // Use this utility to remove placeholder characters
    removeGuide, // removeGuide('+1 (212) 555-____') => '+1 (212) 555'
    ...guideOptions
} = maskitoWithGuide(GUIDE);

export default {
    ...guideOptions,
    postprocessor: maskitoPipe(
        maskitoPrefixPostprocessorGenerator('+1'),
        guideOptions.postprocessor,
    ),
    mask: [
        '+',
        '1',
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
        /\d/,
        /\d/,
    ],
} as MaskitoOptions;
