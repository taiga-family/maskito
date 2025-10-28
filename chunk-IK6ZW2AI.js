import"./chunk-6M32EY24.js";var i=`import type {MaskitoOptions} from '@maskito/core';
import {maskitoUpdateElement} from '@maskito/core';
import {maskitoEventHandler, maskitoTimeOptionsGenerator} from '@maskito/kit';

const timeOptions = maskitoTimeOptionsGenerator({
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
`;export{i as default};
