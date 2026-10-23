import {clamp, parseDateString} from '../../../utils';
import type {MaskitoDateParams} from '../date-params';
import {maskitoWithDateDefaults} from './with-date-defaults';

export function maskitoParseDate(value: string, params: MaskitoDateParams): Date | null {
    const {mode, min, max} = maskitoWithDateDefaults(params);
    const digitsPattern = mode.replaceAll(/[^dmy]/g, '');
    const digits = value.replaceAll(/\D+/g, '');

    if (digits.length !== digitsPattern.length) {
        return null;
    }

    const {year = '0', month = '1', day = '1'} = parseDateString(value, mode);
    const fullYear = Number(year.length === 2 ? `20${year}` : year);
    const parsedDate = new Date(0);

    parsedDate.setFullYear(fullYear, Number(month) - 1, Number(day));
    parsedDate.setHours(0, 0, 0, 0);

    if (
        parsedDate.getFullYear() !== fullYear ||
        parsedDate.getMonth() !== Number(month) - 1 ||
        parsedDate.getDate() !== Number(day)
    ) {
        return null;
    }

    return mode.includes('y') ? clamp(parsedDate, min, max) : parsedDate;
}
