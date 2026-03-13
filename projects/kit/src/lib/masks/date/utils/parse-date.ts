import {DEFAULT_MAX_DATE, DEFAULT_MIN_DATE} from '../../../constants';
import {clamp, parseDateString, segmentsToDate} from '../../../utils';
import type {MaskitoDateParams} from '../date-params';

export function maskitoParseDate(
    value: string,
    {mode, min = DEFAULT_MIN_DATE, max = DEFAULT_MAX_DATE}: MaskitoDateParams,
): Date | null {
    const digitsPattern = mode.replaceAll(/[^dmy]/g, '');
    const digits = value.replaceAll(/\D+/g, '');

    if (digits.length !== digitsPattern.length) {
        return null;
    }

    const dateSegments = parseDateString(value, mode);

    const parsedDate = segmentsToDate(dateSegments);

    return mode.includes('y') ? clamp(parsedDate, min, max) : parsedDate;
}
