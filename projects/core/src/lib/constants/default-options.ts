import {MaskitoOptions} from '../types';
import {identity} from '../utils/identity';

export const MASKITO_DEFAULT_OPTIONS: Required<MaskitoOptions> = {
    mask: /^.*$/,
    preprocessor: identity,
    postprocessor: identity,
    plugins: [],
    overwriteMode: 'shift',
};
