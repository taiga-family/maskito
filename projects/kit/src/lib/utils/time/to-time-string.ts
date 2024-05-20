import type {MaskitoTimeSegments} from '../../types';

const LEADING_NON_DIGITS = /^\D*/;
const TRAILING_NON_DIGITS = /\D*$/;

export function toTimeString({
    hours = '',
    minutes = '',
    seconds = '',
    milliseconds = '',
}: Partial<MaskitoTimeSegments>): string {
    return `${hours}:${minutes}:${seconds}.${milliseconds}`
        .replace(LEADING_NON_DIGITS, '')
        .replace(TRAILING_NON_DIGITS, '');
}
