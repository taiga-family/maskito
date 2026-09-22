import {DATE_TIME_SEPARATOR} from '../../masks/date-time/constants';
import type {
    MaskitoDateSegments,
    MaskitoTimeMode,
    MaskitoTimeSegments,
} from '../../types';
import {toTimeString} from '../time/to-time-string';

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
        timeMode: MaskitoTimeMode;
        timeSeparators?: readonly string[];
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
        timeSeparators = [],
    }: {
        dateMode: string;
        dateTimeSeparator?: string;
        timeMode?: MaskitoTimeMode;
        timeSeparators?: readonly string[];
    },
): string {
    const yearLength = dateMode.match(/y/g)?.length ?? 0;
    const date = dateMode
        .replaceAll(/d+/g, day ?? '')
        .replaceAll(/m+/g, month ?? '')
        .replaceAll(/y+/g, year?.slice(-yearLength) ?? '');

    const time = timeMode
        ? `${dateTimeSeparator}${toTimeString(
              {hours, minutes, seconds, milliseconds},
              {mode: timeMode, separators: timeSeparators},
          )}`
        : '';

    return `${date}${time}`.replaceAll(/^\D+/g, '').replaceAll(/\D+$/g, '');
}
