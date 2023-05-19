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
     *     const cleanValue = removePlaceholder(this.value);
     *
     *     inputRef.value = cleanValue === '+1' ? '' : cleanValue;
     * });
     */
    removePlaceholder,
    plugins,
    ...placeholderOptions
} = maskitoWithPlaceholder(PLACEHOLDER);

export default {
    preprocessor: placeholderOptions.preprocessor,
    postprocessor: maskitoPipe(
        maskitoPrefixPostprocessorGenerator('+1'),
        placeholderOptions.postprocessor,
    ),
    plugins,
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
