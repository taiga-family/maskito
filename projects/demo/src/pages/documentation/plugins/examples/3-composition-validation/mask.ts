import {maskitoCompositionValidationPlugin, MaskitoOptions} from '@maskito/core';

export default {
    mask: /^[0-9０-９]*$/,
    plugins: [maskitoCompositionValidationPlugin()],
} as MaskitoOptions;
