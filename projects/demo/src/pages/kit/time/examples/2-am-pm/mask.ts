import {type MaskitoOptions, maskitoUpdateElement} from '@maskito/core';
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
    ],
} satisfies MaskitoOptions;
