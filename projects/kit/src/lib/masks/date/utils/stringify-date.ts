import {DEFAULT_MAX_DATE, DEFAULT_MIN_DATE} from '../../../constants';
import {clamp, getDateSegmentValueLength, toDateString} from '../../../utils';
import type {MaskitoDateParams} from '../date-params';

export function maskitoStringifyDate(
    date: Date,
    {mode, separator, min = DEFAULT_MIN_DATE, max = DEFAULT_MAX_DATE}: MaskitoDateParams,
): string {
    const validatedDate = clamp(date, min, max);

    const segmentsLength = getDateSegmentValueLength(mode);

    const segments = {
        day: validatedDate.getDate().toString().padStart(segmentsLength.day, '0'),
        month: (validatedDate.getMonth() + 1)
            .toString()
            .padStart(segmentsLength.month, '0'),
        year: validatedDate.getFullYear().toString().padStart(segmentsLength.year, '0'),
    };

    return toDateString(segments, {
        dateMode: separator ? mode.replaceAll('/', separator) : mode,
    });
}
