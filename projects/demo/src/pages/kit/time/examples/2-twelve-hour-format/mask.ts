import type {MaskitoOptions} from '@maskito/core';
import {maskitoUpdateElement} from '@maskito/core';
import {maskitoEventHandler, maskitoTimeOptionsGenerator} from '@maskito/kit';

const timeOptions = maskitoTimeOptionsGenerator({
    mode: 'HH:MM',
    timeSegmentMaxValues: {hours: 12},
});

export default {
    ...timeOptions,
    plugins: [
        ...timeOptions.plugins,
        maskitoEventHandler('blur', (element) => {
            const [hours = '', minutes = ''] = element.value.split(':');

            maskitoUpdateElement(
                element,
                [hours, minutes].map((segment) => segment.padEnd(2, '0')).join(':'),
            );
        }),
    ],
} as MaskitoOptions;
