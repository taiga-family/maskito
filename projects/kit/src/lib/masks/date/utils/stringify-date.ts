import {DEFAULT_MAX_DATE, DEFAULT_MIN_DATE} from '../../../constants';
import {toDateString} from '../../../utils';
import type {MaskitoDateParams} from '../date-mask';

export function maskitoStringifyDate(
    date: Date,
    {mode, separator, min, max}: MaskitoDateParams,
): string {
    const validatedDate = new Date(
        Math.max(
            Math.min(date.getTime(), (max ?? DEFAULT_MAX_DATE).getTime()),
            (min ?? DEFAULT_MIN_DATE).getTime(),
        ),
    );

    return toDateString(
        {
            day: validatedDate.getDate().toString().padStart(2, '0'),
            month: (validatedDate.getMonth() + 1).toString().padStart(2, '0'),
            year: validatedDate.getFullYear().toString().padStart(4, '0'),
        },
        {dateMode: separator ? mode.replaceAll('/', separator) : mode},
    );
}
