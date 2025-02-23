import {DEFAULT_MAX_DATE, DEFAULT_MIN_DATE} from '../../../constants';
import {parseDateString, segmentsToDate} from '../../../utils';
import type {MaskitoDateParams} from '../date-mask';

export function maskitoParseDate(
    value: string,
    {mode, min, max}: MaskitoDateParams,
): Date {
    const dateSegments = parseDateString(value, mode);

    const parsedDateTime = segmentsToDate(dateSegments).getTime();

    const minTime = (min ?? DEFAULT_MIN_DATE).getTime();
    const maxTime = (max ?? DEFAULT_MAX_DATE).getTime();

    return new Date(Math.min(Math.max(parsedDateTime, minTime), maxTime));
}
