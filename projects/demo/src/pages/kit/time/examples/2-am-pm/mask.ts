import type {MaskitoOptions} from '@maskito/core';
import {maskitoUpdateElement} from '@maskito/core';
import {
    maskitoEventHandler,
    maskitoSelectionChangeHandler,
    maskitoTimeOptionsGenerator,
} from '@maskito/kit';

const timeOptions = maskitoTimeOptionsGenerator({mode: 'HH:MM AA'});

export default {
    ...timeOptions,
    plugins: [
        ...timeOptions.plugins,
        maskitoSelectionChangeHandler((element) => {
            element.inputMode =
                element.selectionStart! >= 'HH:MM'.length ? 'text' : 'numeric';
        }),
        maskitoEventHandler('blur', (element) => {
            if (element.value.length >= 'HH:MM'.length && !element.value.endsWith('M')) {
                maskitoUpdateElement(element, `${element.value} AM`);
            }
        }),
    ],
} satisfies MaskitoOptions;
