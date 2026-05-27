import type {MaskitoOptions} from '@maskito/core';
import {
    maskitoSelectionChangeHandler,
    maskitoTime,
    type MaskitoTimeMode,
} from '@maskito/kit';

const mode: MaskitoTimeMode = 'HH:MM';

const timeOptions = maskitoTime({
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
