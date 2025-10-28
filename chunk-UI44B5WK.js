import"./chunk-6M32EY24.js";var i=`import type {MaskitoOptions} from '@maskito/core';
import type {MaskitoTimeMode} from '@maskito/kit';
import {maskitoSelectionChangeHandler, maskitoTimeOptionsGenerator} from '@maskito/kit';

const mode: MaskitoTimeMode = 'HH:MM AA';

const timeOptions = maskitoTimeOptionsGenerator({mode});

export default {
    ...timeOptions,
    plugins: [
        ...timeOptions.plugins,
        maskitoSelectionChangeHandler((element) => {
            element.inputMode =
                element.selectionStart! >= mode.indexOf(' AA') ? 'text' : 'numeric';
        }),
    ],
} satisfies MaskitoOptions;
`;export{i as default};
