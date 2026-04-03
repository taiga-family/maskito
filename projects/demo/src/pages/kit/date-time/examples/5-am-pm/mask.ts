import type {MaskitoOptions} from '@maskito/core';
import {
    type MaskitoDateMode,
    maskitoDateTimeOptionsGenerator,
    maskitoSelectionChangeHandler,
    type MaskitoTimeMode,
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
                element.selectionStart! >=
                `${`${dateMode}${dateTimeSeparator}`}HH:MM`.length
                    ? 'text'
                    : 'numeric';
        }),
    ],
} satisfies MaskitoOptions;
