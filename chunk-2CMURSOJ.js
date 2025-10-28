import"./chunk-6M32EY24.js";var o=`import type {MaskitoOptions} from '@maskito/core';
import type {MaskitoDateMode, MaskitoTimeMode} from '@maskito/kit';
import {
    maskitoDateTimeOptionsGenerator,
    maskitoSelectionChangeHandler,
} from '@maskito/kit';

const dateTimeSeparator = ', ';
const dateMode: MaskitoDateMode = 'dd/mm/yyyy';
const timeMode: MaskitoTimeMode = 'HH:MM AA';

const dateTimeOptions = maskitoDateTimeOptionsGenerator({
    dateMode,
    timeMode,
    dateTimeSeparator,
    dateSeparator: '/',
});

export default {
    ...dateTimeOptions,
    plugins: [
        ...dateTimeOptions.plugins,
        maskitoSelectionChangeHandler((element) => {
            element.inputMode =
                element.selectionStart! >= \`\${dateMode + dateTimeSeparator}HH:MM\`.length
                    ? 'text'
                    : 'numeric';
        }),
    ],
} satisfies MaskitoOptions;
`;export{o as default};
