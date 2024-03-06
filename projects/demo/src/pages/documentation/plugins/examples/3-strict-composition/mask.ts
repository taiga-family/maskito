import type {MaskitoOptions} from '@maskito/core';
import {maskitoStrictCompositionPlugin} from '@maskito/core';

export default {
    mask: /^[0-9０-９]*$/,
    plugins: [maskitoStrictCompositionPlugin()],
} as MaskitoOptions;
