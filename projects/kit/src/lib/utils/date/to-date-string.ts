import {DATE_TIME_SEPARATOR} from '../../masks/date-time/constants';
import type {MaskitoDateSegments, MaskitoTimeSegments} from '../../types';

export function toDateString(
    segments: Partial<MaskitoDateSegments>,
    options: {
        dateMode: string;
    },
): string;
export function toDateString(
    segments: Partial<MaskitoDateSegments & MaskitoTimeSegments>,
    options: {
        dateMode: string;
        dateTimeSeparator: string;
        timeMode: string;
    },
): string;
export function toDateString(
    {
        day,
        month,
        year,
        hours,
        minutes,
        seconds,
        milliseconds,
    }: Partial<MaskitoDateSegments & MaskitoTimeSegments>,
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
    const yearLength = dateMode.match(/y/g)?.length ?? 0;
    const fullMode = dateMode + (timeMode ? dateTimeSeparator + timeMode : '');

    return fullMode
        .replaceAll(/d+/g, day ?? '')
        .replaceAll(/m+/g, month ?? '')
        .replaceAll(/y+/g, year?.slice(-yearLength) ?? '')
        .replaceAll(/H+/g, hours ?? '')
        .replaceAll('MSS', milliseconds ?? '')
        .replaceAll(/M+/g, minutes ?? '')
        .replaceAll(/S+/g, seconds ?? '')
        .replaceAll(/^\D+/g, '')
        .replaceAll(/\D+$/g, '');
}
