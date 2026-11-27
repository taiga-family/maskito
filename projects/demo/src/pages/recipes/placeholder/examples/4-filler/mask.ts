import type {MaskitoOptions} from '@maskito/core';
import {maskitoDate, maskitoEventHandler} from '@maskito/kit';

export const PLACEHOLDER = 'dd/mm/yyyy';

const dateOptions = maskitoDate({
    mode: 'dd/mm/yyyy',
    separator: '/',
});

export default {
    ...dateOptions,
    plugins: [
        ...dateOptions.plugins,
        maskitoEventHandler('input', (element) => {
            element.placeholder = `${element.value.slice(0, PLACEHOLDER.length)}${PLACEHOLDER.slice(element.value.length)}`;
        }),
    ],
} satisfies Required<MaskitoOptions>;
