import"./chunk-TIC6Q35B.js";var s=`import type {MaskitoOptions} from '@maskito/core';
import {
    maskitoAddOnFocusPlugin,
    maskitoCaretGuard,
    maskitoPostfixPostprocessorGenerator,
    maskitoPrefixPostprocessorGenerator,
    maskitoRemoveOnBlurPlugin,
} from '@maskito/kit';

export default {
    // prefix (dollar sign) + digits + postfix ('.00')
    mask: /^\\$?\\d*(\\.0{0,2})?$/,
    postprocessors: [
        maskitoPrefixPostprocessorGenerator('$'),
        maskitoPostfixPostprocessorGenerator('.00'),
    ],
    plugins: [
        maskitoAddOnFocusPlugin('$.00'),
        maskitoRemoveOnBlurPlugin('$.00'),
        // Disallow to put caret before the prefix or after the postfix
        maskitoCaretGuard((value) => ['$'.length, value.length - '.00'.length]),
    ],
} satisfies MaskitoOptions;
`;export{s as default};
