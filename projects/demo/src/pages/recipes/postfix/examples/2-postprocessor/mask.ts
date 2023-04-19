import {MaskitoOptions, maskitoPipe} from '@maskito/core';
import {
    maskitoPostfixPostprocessorGenerator,
    maskitoPrefixPostprocessorGenerator,
} from '@maskito/kit';

export default {
    // prefix (dollar sign) + digits + postfix ('.00')
    mask: /^\$?\d*(\.0{0,2})?$/,
    postprocessor: maskitoPipe(
        maskitoPrefixPostprocessorGenerator('$'),
        maskitoPostfixPostprocessorGenerator('.00'),
    ),
} as MaskitoOptions;
