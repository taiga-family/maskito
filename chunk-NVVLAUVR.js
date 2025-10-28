import"./chunk-6M32EY24.js";var e=`import type {MaskitoOptions} from '@maskito/core';
import {maskitoUpdateElement} from '@maskito/core';
import {
    maskitoAddOnFocusPlugin,
    maskitoEventHandler,
    maskitoPrefixPostprocessorGenerator,
} from '@maskito/kit';
// import {maskitoRemoveOnBlurPlugin} from '@maskito/kit';

const countryPrefix = '+1 ';

export default {
    plugins: [
        maskitoAddOnFocusPlugin(countryPrefix),
        /**
         * You can also just use \`maskitoRemoveOnBlurPlugin(countryPrefix)\`
         * instead of plugin below.
         */
        maskitoEventHandler('blur', (element) => {
            if (element.value === countryPrefix) {
                maskitoUpdateElement(element, '');
            }
        }),
    ],
    postprocessors: [maskitoPrefixPostprocessorGenerator(countryPrefix)],
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
} satisfies MaskitoOptions;
`;export{e as default};
