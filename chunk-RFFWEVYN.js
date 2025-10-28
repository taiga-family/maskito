import"./chunk-6M32EY24.js";var o=`import type {MaskitoOptions} from '@maskito/core';
import {maskitoUpdateElement} from '@maskito/core';
import {
    maskitoEventHandler,
    maskitoPrefixPostprocessorGenerator,
    maskitoWithPlaceholder,
} from '@maskito/kit';

/**
 * It is better to use en quad for placeholder characters
 * instead of simple space.
 * @see https://symbl.cc/en/2000
 */
const PLACEHOLDER = '+\u2000 (\u2000\u2000\u2000) ___-____';
const {
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
    preprocessors: placeholderOptions.preprocessors,
    postprocessors: [
        maskitoPrefixPostprocessorGenerator('+1'),
        ...placeholderOptions.postprocessors,
    ],
    mask: [
        '+',
        '1',
        ' ',
        '(',
        /\\d/,
        /\\d/,
        /\\d/,
        ')',
        ' ',
        /\\d/,
        /\\d/,
        /\\d/,
        '-',
        /\\d/,
        /\\d/,
        /\\d/,
        /\\d/,
    ],
    plugins: [
        ...plugins,
        maskitoEventHandler('focus', (element) => {
            const initialValue = element.value || '+1 (';

            maskitoUpdateElement(
                element,
                initialValue + PLACEHOLDER.slice(initialValue.length),
            );
        }),
        maskitoEventHandler('blur', (element) => {
            const cleanValue = removePlaceholder(element.value);

            maskitoUpdateElement(element, cleanValue === '+1' ? '' : cleanValue);
        }),
    ],
} satisfies MaskitoOptions;
`;export{o as default};
