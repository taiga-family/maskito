import type {MaskitoOptions} from '@maskito/core';
import {maskitoCaretGuard, maskitoNumberOptionsGenerator} from '@maskito/kit';

const {plugins, ...numberOptions} = maskitoNumberOptionsGenerator({
    postfix: '%',
    min: 0,
    max: 100,
    precision: 2,
});

export default {
    ...numberOptions,
    plugins: [
        ...plugins,
        // Forbids caret to be placed after postfix
        maskitoCaretGuard(value => [0, value.length - 1]),
    ],
} as MaskitoOptions;
