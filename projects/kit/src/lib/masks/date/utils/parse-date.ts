import {DEFAULT_MAX_DATE, DEFAULT_MIN_DATE} from '../../../constants';
import {clamp, parseDateString, segmentsToDate} from '../../../utils';
import type {MaskitoDateParams} from '../date-params';
import {getLocaleDateParams} from './get-locale-date-params';

export function maskitoParseDate(
    value: string,
    {min = DEFAULT_MIN_DATE, max = DEFAULT_MAX_DATE, ...params}: MaskitoDateParams,
): Date | null {
    const localeParams =
        'locale' in params && params.locale ? getLocaleDateParams(params.locale) : null;

    const mode = params.mode ?? localeParams?.mode ?? 'dd/mm/yyyy';
    const digitsPattern = mode.replaceAll(/[^dmy]/g, '');
    const digits = value.replaceAll(/\D+/g, '');

    if (digits.length !== digitsPattern.length) {
        return null;
    }

    const dateSegments = parseDateString(value, mode);
    const parsedDate = segmentsToDate(dateSegments);

    return mode.includes('y') ? clamp(parsedDate, min, max) : parsedDate;
}
