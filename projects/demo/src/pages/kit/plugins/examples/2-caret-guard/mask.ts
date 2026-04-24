import type {MaskitoOptions} from '@maskito/core';
import {maskitoCaretGuard, maskitoNumber} from '@maskito/kit';

const prefix = '$';
const postfix = ' per day';

const numberOptions = maskitoNumber({
    prefix,
    postfix,
    min: 0,
});

export default {
    ...numberOptions,
    plugins: [
        ...numberOptions.plugins,
        maskitoCaretGuard((value) => [prefix.length, value.length - postfix.length]),
    ],
} satisfies MaskitoOptions;
