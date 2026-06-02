import type {MaskitoOptions} from '@maskito/core';
import {
    type MaskitoDateMode,
    maskitoDateTime,
    maskitoSelectionChangeHandler,
    type MaskitoTimeMode,
} from '@maskito/kit';

const dateTimeSeparator = ', ';
const dateMode: MaskitoDateMode = 'dd/mm/yyyy';
const timeMode: MaskitoTimeMode = 'HH:MM';

const dateTimeOptions = maskitoDateTime({
    dateMode,
    timeMode,
    dayPeriod: ['AM', 'PM'],
    dateTimeSeparator,
    dateSeparator: '/',
});

export default {
    ...dateTimeOptions,
    plugins: [
        ...dateTimeOptions.plugins,
        maskitoSelectionChangeHandler((element) => {
            element.inputMode =
                element.selectionStart! >= `${dateMode}${dateTimeSeparator}HH:MM`.length
                    ? 'text'
                    : 'numeric';
        }),
    ],
} satisfies MaskitoOptions;
