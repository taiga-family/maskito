import"./chunk-6M32EY24.js";var o=`import type {MaskitoOptions} from '@maskito/core';
import {maskitoCaretGuard, maskitoNumberOptionsGenerator} from '@maskito/kit';

const prefix = '$';
const postfix = ' per day';

const numberOptions = maskitoNumberOptionsGenerator({
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
`;export{o as default};
