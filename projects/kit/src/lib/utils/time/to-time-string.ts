import type {MaskitoTimeSegments} from '../../types';

const LEADING_NON_DIGITS = /^\D*/;
const TRAILING_NON_DIGITS = /\D*$/;

export function toTimeString(
    {
        hours = '',
        minutes = '',
        seconds = '',
        milliseconds = '',
    }: Partial<MaskitoTimeSegments>,
    separators: readonly [string, string, string] = [':', ':', '.'],
): string {
    return `${hours}${separators[0]}${minutes}${separators[1]}${seconds}${separators[2]}${milliseconds}`
        .replace(LEADING_NON_DIGITS, '')
        .replace(TRAILING_NON_DIGITS, '');
}
