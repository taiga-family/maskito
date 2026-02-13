import {DEFAULT_MAX_DATE, DEFAULT_MIN_DATE} from '../../../constants';
import {clamp, toDateString} from '../../../utils';
import type {MaskitoDateParams} from '../date-params';
import {toDateSegments} from './to-date-segments';

export function maskitoStringifyDate(
    date: Date,
    {
        mode,
        separator = '.',
        min = DEFAULT_MIN_DATE,
        max = DEFAULT_MAX_DATE,
    }: MaskitoDateParams,
): string {
    const validatedDate = clamp(date, min, max);
    const {year, ...segments} = toDateSegments(validatedDate);

    return toDateString(
        {...segments, year: year.padStart(mode.match(/y/g)?.length ?? 0, '0')},
        {dateMode: mode.replaceAll('/', separator)},
    );
}
