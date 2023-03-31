import {MaskitoOptions} from '@maskito/core';
import {maskitoPrefixPostprocessorGenerator} from '@maskito/kit';

export default {
    mask: /^\$?\d*$/, // dollar sign or digits
    postprocessor: maskitoPrefixPostprocessorGenerator('$'),
} as MaskitoOptions;
