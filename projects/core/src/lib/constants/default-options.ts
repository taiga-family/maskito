import {MaskitoOptions} from '@maskito/core';

import {identity} from '../utils';

export const MASKITO_DEFAULT_OPTIONS: Required<MaskitoOptions> = {
    mask: /^.*$/,
    preprocessor: identity,
    postprocessor: identity,
    overwriteMode: 'shift',
};
