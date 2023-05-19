import {MaskitoOptions, maskitoPipe} from '@maskito/core';
import {maskitoDateOptionsGenerator, maskitoWithPlaceholder} from '@maskito/kit';

export const PLACEHOLDER = 'dd/mm/yyyy';

const dateOptions = maskitoDateOptionsGenerator({
    mode: 'dd/mm/yyyy',
    separator: '/',
});

const {
    plugins, // plugins keeps caret inside actual value and remove placeholder on blur
    ...placeholderOptions
    // pass 'true' as second argument to add plugin to hide placeholder when input is not focused
} = maskitoWithPlaceholder(PLACEHOLDER, true);

export default {
    ...dateOptions,
    plugins: plugins.concat(dateOptions.plugins || []),
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
