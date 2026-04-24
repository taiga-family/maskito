import {maskitoChangeEventPlugin, type MaskitoOptions} from '@maskito/core';
import {maskitoNumber} from '@maskito/kit';

const numberOptions = maskitoNumber({maximumFractionDigits: 2});

export default {
    ...numberOptions,
    plugins: [
        ...numberOptions.plugins,
        maskitoChangeEventPlugin(), // <--- Enable it
    ],
} satisfies MaskitoOptions;
