import {MaskitoOptions} from '@maskito/core';
import {
    maskitoCaretGuard,
    maskitoPostfixPostprocessorGenerator,
    maskitoPrefixPostprocessorGenerator,
} from '@maskito/kit';

export default {
    // prefix (dollar sign) + digits + postfix ('.00')
    mask: /^\$?\d*(\.0{0,2})?$/,
    postprocessors: [
        maskitoPrefixPostprocessorGenerator('$'),
        maskitoPostfixPostprocessorGenerator('.00'),
    ],
    plugins: [
        // Disallow to put caret before the prefix or after the postfix
        maskitoCaretGuard(value => ['$'.length, value.length - '.00'.length]),
    ],
} as MaskitoOptions;
