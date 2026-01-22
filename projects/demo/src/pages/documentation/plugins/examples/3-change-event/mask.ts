import type {MaskitoOptions} from '@maskito/core';
import {maskitoChangeEventPlugin} from '@maskito/core';
import {maskitoNumberOptionsGenerator} from '@maskito/kit';

const numberOptions = maskitoNumberOptionsGenerator({maximumFractionDigits: 2});

export default {
    ...numberOptions,
    plugins: [
        ...numberOptions.plugins,
        maskitoChangeEventPlugin(), // <--- Enable it
    ],
} satisfies MaskitoOptions;
