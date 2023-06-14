import {MaskitoOptions} from '@maskito/core';
import {maskitoPrefixPostprocessorGenerator} from '@maskito/kit';

export default {
    mask: /^\$?\d*$/, // dollar sign or digits
    postprocessors: [maskitoPrefixPostprocessorGenerator('$')],
} as MaskitoOptions;
