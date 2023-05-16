import {MaskitoOptions, maskitoPipe} from '@maskito/core';
import {maskitoDateOptionsGenerator, maskitoWithPlaceholder} from '@maskito/kit';

export const PLACEHOLDER = 'dd/mm/yyyy';

const dateOptions = maskitoDateOptionsGenerator({
    mode: 'dd/mm/yyyy',
    separator: '/',
});

export const {
    // Use this utility to remove placeholder characters
    removePlaceholder, // removePlaceholder('31/12/yyyy') => '31/12'
    ...placeholderOptions
} = maskitoWithPlaceholder(PLACEHOLDER);

export default {
    ...dateOptions,
    preprocessor: maskitoPipe(
        // Always put it BEFORE all other preprocessors
        placeholderOptions.preprocessor,
        dateOptions.preprocessor,
    ),
    postprocessor: maskitoPipe(
        dateOptions.postprocessor,
        // Always put it AFTER all other postprocessors
        placeholderOptions.postprocessor,
    ),
} as Required<MaskitoOptions>;
