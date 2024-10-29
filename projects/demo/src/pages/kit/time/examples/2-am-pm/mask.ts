import type {MaskitoOptions} from '@maskito/core';
import {maskitoUpdateElement} from '@maskito/core';
import {maskitoEventHandler, maskitoTimeOptionsGenerator} from '@maskito/kit';

const timeOptions = maskitoTimeOptionsGenerator({
    mode: 'HH:MM AA',
});

export default {
    ...timeOptions,
    plugins: [
        ...timeOptions.plugins,
        maskitoEventHandler('blur', (element) => {
            if (element.value.length >= 'HH:MM'.length && !element.value.endsWith('M')) {
                maskitoUpdateElement(element, `${element.value} AM`);
            }
        }),
        (element) => {
            const listener = (): void => {
                element.inputMode =
                    element.selectionStart! >= 'HH:MM'.length ? 'text' : 'decimal';
            };

            element.ownerDocument.addEventListener('selectionchange', listener);

            return () =>
                element.ownerDocument.removeEventListener('selectionchange', listener);
        },
    ],
} satisfies MaskitoOptions;
