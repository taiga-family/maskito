import type {MaskitoOptions} from '@maskito/core';
import {
    maskitoSelectionChangeHandler,
    type MaskitoTimeMode,
    maskitoTimeOptionsGenerator,
} from '@maskito/kit';

const mode: MaskitoTimeMode = 'HH:MM';

const timeOptions = maskitoTimeOptionsGenerator({
    mode,
    dayPeriod: ['AM', 'PM'],
});

export default {
    ...timeOptions,
    plugins: [
        ...timeOptions.plugins,
        maskitoSelectionChangeHandler((element) => {
            element.inputMode =
                element.selectionStart! >= mode.length ? 'text' : 'numeric';
        }),
    ],
} satisfies MaskitoOptions;
