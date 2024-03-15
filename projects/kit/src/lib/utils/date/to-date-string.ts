import {DATE_TIME_SEPARATOR} from '../../masks/date-time/constants';
import type {MaskitoDateSegments, MaskitoTimeSegments} from '../../types';

export function toDateString(
    {
        day,
        month,
        year,
        hours,
        minutes,
        seconds,
        milliseconds,
    }: Partial<MaskitoDateSegments & Partial<MaskitoTimeSegments>>,
    {
        dateMode,
        dateTimeSeparator = DATE_TIME_SEPARATOR,
        timeMode,
    }: {
        dateMode: string;
        dateTimeSeparator?: string;
        timeMode?: string;
    },
): string {
    const safeYear = dateMode.match(/y/g)?.length === 2 ? year?.slice(-2) : year;
    const fullMode = dateMode + (timeMode ? dateTimeSeparator + timeMode : '');

    return fullMode
        .replaceAll(/d+/g, day ?? '')
        .replaceAll(/m+/g, month ?? '')
        .replaceAll(/y+/g, safeYear ?? '')
        .replaceAll(/H+/g, hours ?? '')
        .replaceAll('MSS', milliseconds ?? '')
        .replaceAll(/M+/g, minutes ?? '')
        .replaceAll(/S+/g, seconds ?? '')
        .replaceAll(/^\D+/g, '')
        .replaceAll(/\D+$/g, '');
}
