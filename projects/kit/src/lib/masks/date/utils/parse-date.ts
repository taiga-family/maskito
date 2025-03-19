import {DEFAULT_MAX_DATE, DEFAULT_MIN_DATE} from '../../../constants';
import {clamp, parseDateString, segmentsToDate} from '../../../utils';
import type {MaskitoDateParams} from '../date-params';

export function maskitoParseDate(
    value: string,
    {mode, min = DEFAULT_MIN_DATE, max = DEFAULT_MAX_DATE}: MaskitoDateParams,
): Date | null {
    if (value.length < mode.length) {
        return null;
    }
    
    const dateSegments = parseDateString(value, mode);

    const parsedDate = segmentsToDate(dateSegments);

    return clamp(parsedDate, min, max);
}
