import {parseDateString} from '../../utils';
import type {MaskitoDateParams} from './date-mask';

export function maskitoParseDate(
    value: string,
    {mode, min, max}: MaskitoDateParams,
): Date {
    const dateSegments = parseDateString(value, mode);

    const year = Number(dateSegments.year);
    const month = Number(dateSegments.month);
    const day = Number(dateSegments.day) ?? 1;

    let parsedDateTime = new Date(year, month, day).getTime();

    parsedDateTime = max ? Math.min(max.getTime(), parsedDateTime) : parsedDateTime;
    parsedDateTime = min ? Math.max(min.getTime(), parsedDateTime) : parsedDateTime;

    return new Date(parsedDateTime);
}
