import {MaskitoOptions} from '../types';

export const MASKITO_DEFAULT_OPTIONS: Required<MaskitoOptions> = {
    mask: /^.*$/,
    preprocessors: [],
    postprocessors: [],
    plugins: [],
    overwriteMode: 'shift',
};
