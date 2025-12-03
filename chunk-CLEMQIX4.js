import"./chunk-ENRHZQ2S.js";var e=`import type {MaskitoOptions} from '@maskito/core';
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
    preprocessors: [
        // Always put it BEFORE all other preprocessors
        ...placeholderOptions.preprocessors,
        ...dateOptions.preprocessors,
    ],
    postprocessors: [
        ...dateOptions.postprocessors,
        // Always put it AFTER all other postprocessors
        ...placeholderOptions.postprocessors,
    ],
} satisfies Required<MaskitoOptions>;
`;export{e as default};
