import type {MaskitoOptions} from '@maskito/core';
import {maskitoScrollPlugin} from '@maskito/core';
import {maskitoNumberOptionsGenerator} from '@maskito/kit';

const numberOptions = maskitoNumberOptionsGenerator({
    precision: 2,
    prefix: '$',
});

export default {
    ...numberOptions,
    plugins: [
        ...numberOptions.plugins,
        maskitoScrollPlugin(), // <--- Enable it
    ],
} satisfies MaskitoOptions;
