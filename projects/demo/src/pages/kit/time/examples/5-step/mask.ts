import {type MaskitoOptions, maskitoUpdateElement} from '@maskito/core';
import {maskitoEventHandler, maskitoTime} from '@maskito/kit';

const timeOptions = maskitoTime({
    mode: 'HH:MM:SS',
    step: 1,
});

export default {
    ...timeOptions,
    plugins: [
        ...timeOptions.plugins,
        maskitoEventHandler('blur', (element) => {
            const [hh = '', mm = '', ss = ''] = element.value.split(':');

            maskitoUpdateElement(
                element,
                [hh, mm, ss].map((segment) => segment.padEnd(2, '0')).join(':'),
            );
        }),
    ],
} satisfies MaskitoOptions;
