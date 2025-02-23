import {DEFAULT_MAX_DATE, DEFAULT_MIN_DATE} from '../../constants';
import {toDateString} from '../../utils';
import type {MaskitoDateParams} from './date-mask';

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
            day: validatedDate.getDate().toString(),
            month: (validatedDate.getMonth() + 1).toString(),
            year: validatedDate.getFullYear().toString(),
        },
        {dateMode: separator ? mode.replaceAll('/', separator) : mode},
    );
}
