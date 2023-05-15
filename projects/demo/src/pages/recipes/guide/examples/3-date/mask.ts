import {MaskitoOptions, maskitoPipe} from '@maskito/core';
import {maskitoDateOptionsGenerator, maskitoWithGuide} from '@maskito/kit';

export const GUIDE = 'dd/mm/yyyy';

const dateOptions = maskitoDateOptionsGenerator({
    mode: 'dd/mm/yyyy',
    separator: '/',
});

export const {
    // Use this utility to remove placeholder characters
    removeGuide, // removeGuide('31/12/yyyy') => '31/12'
    ...guideOptions
} = maskitoWithGuide(GUIDE);

export default {
    ...guideOptions,
    mask: dateOptions.mask,
    preprocessor: maskitoPipe(
        // Always put it BEFORE all other preprocessors
        guideOptions.preprocessor,
        dateOptions.preprocessor,
    ),
    postprocessor: maskitoPipe(
        dateOptions.postprocessor,
        // Always put it AFTER all other postprocessors
        guideOptions.postprocessor,
    ),
} as Required<MaskitoOptions>;
