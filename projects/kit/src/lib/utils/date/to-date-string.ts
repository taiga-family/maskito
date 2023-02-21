import {DATE_TIME_SEPARATOR} from '../../masks/date-time/constants';
import {MaskitoDateSegments, MaskitoTimeSegments} from '../../types';

export function toDateString(
    {
        day,
        month,
        year,
        hours,
        minutes,
        seconds,
        milliseconds,
    }: Partial<MaskitoDateSegments<string> & Partial<MaskitoTimeSegments>>,
    dateMode: string,
    timeMode?: string,
): string {
    const safeYear = dateMode.match(/y/g)?.length === 2 ? year?.slice(-2) : year;
    const fullMode = dateMode + (timeMode ? DATE_TIME_SEPARATOR + timeMode : '');

    return fullMode
        .replace(/d+/g, day ?? '')
        .replace(/m+/g, month ?? '')
        .replace(/y+/g, safeYear ?? '')
        .replace(/H+/g, hours ?? '')
        .replace(/MSS/g, milliseconds ?? '')
        .replace(/M+/g, minutes ?? '')
        .replace(/S+/g, seconds ?? '')
        .replace(/^\D+/g, '')
        .replace(/\D+$/g, '');
}
