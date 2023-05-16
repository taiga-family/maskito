import {MaskitoOptions, maskitoPipe} from '@maskito/core';
import {maskitoPrefixPostprocessorGenerator, maskitoWithPlaceholder} from '@maskito/kit';

/**
 * It is better to use en quad for placeholder characters
 * instead of simple space.
 * @see https://symbl.cc/en/2000
 */
export const PLACEHOLDER = '+  (   ) ___-____';
export const {
    /**
     * Use this utility to remove placeholder characters
     * ___
     * @example
     * inputRef.addEventListener('blur', () => {
     *     // removePlaceholder('+1 (212) 555-____') => '+1 (212) 555'
     *     inputRef.value = removePlaceholder(inputRef.value);
     * });
     */
    removePlaceholder,
    ...placeholderOptions
} = maskitoWithPlaceholder(PLACEHOLDER);

export default {
    ...placeholderOptions,
    postprocessor: maskitoPipe(
        maskitoPrefixPostprocessorGenerator('+1'),
        placeholderOptions.postprocessor,
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
