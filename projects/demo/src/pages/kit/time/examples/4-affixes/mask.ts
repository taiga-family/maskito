import type {MaskitoOptions} from '@maskito/core';
import {
    maskitoAddOnFocusPlugin,
    maskitoCaretGuard,
    maskitoRemoveOnBlurPlugin,
    maskitoTimeOptionsGenerator,
} from '@maskito/kit';

export const postfix = ' left';
const {plugins, ...numberOptions} = maskitoTimeOptionsGenerator({
    postfix,
    mode: 'MM:SS',
});

export default {
    ...numberOptions,
    plugins: [
        ...plugins,
        maskitoRemoveOnBlurPlugin(postfix),
        maskitoAddOnFocusPlugin(postfix),
        // Forbids caret to be placed after postfix
        maskitoCaretGuard((value) => [0, value.length - postfix.length]),
    ],
} satisfies MaskitoOptions;
