import {clamp, parseDateString, segmentsToDate} from '../../../utils';
import type {MaskitoDateParams} from '../date-params';
import {withDateDefaults} from './with-date-defaults';

export function maskitoParseDate(value: string, params: MaskitoDateParams): Date | null {
    const {mode, min, max} = withDateDefaults(params);
    const digitsPattern = mode.replaceAll(/[^dmy]/g, '');
    const digits = value.replaceAll(/\D+/g, '');

    if (digits.length !== digitsPattern.length) {
        return null;
    }

    const dateSegments = parseDateString(value, mode);
    const parsedDate = segmentsToDate(dateSegments);

    return mode.includes('y') ? clamp(parsedDate, min, max) : parsedDate;
}
