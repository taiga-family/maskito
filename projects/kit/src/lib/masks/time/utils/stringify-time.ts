import {DEFAULT_TIME_SEGMENT_MAX_VALUES} from '../../../constants';
import type {MaskitoTimeSegments} from '../../../types';
import {padStartTimeSegments} from '../../../utils/time';
import type {MaskitoTimeParams} from '../time-params';

/**
 * Converts milliseconds to a formatted time string based on the given `options.mode`.
 *
 * @param milliseconds unsigned integer milliseconds
 * @param params
 */
export function maskitoStringifyTime(
    milliseconds: number,
    {mode, timeSegmentMaxValues = {}}: MaskitoTimeParams,
): string {
    const maxValues: MaskitoTimeSegments<number> = {
        ...DEFAULT_TIME_SEGMENT_MAX_VALUES,
        ...timeSegmentMaxValues,
    };
    const isMeridiem = mode.includes('AA');
    let isPM = false;

    const msInSecond = maxValues.milliseconds + 1;
    const msInMinute = (maxValues.seconds + 1) * msInSecond;
    const msInHour = (maxValues.minutes + 1) * msInMinute;

    let hours = Math.trunc(milliseconds / msInHour);

    milliseconds -= hours * msInHour;

    if (isMeridiem) {
        isPM = hours >= 12;
        hours %= 12;
        hours = hours === 0 ? 12 : hours;
    }

    const minutes = Math.trunc(milliseconds / msInMinute);

    milliseconds -= minutes * msInMinute;

    const seconds = Math.trunc(milliseconds / msInSecond);

    milliseconds -= seconds * msInSecond;

    const result = padStartTimeSegments({hours, minutes, seconds, milliseconds});

    let formatted = mode
        .replaceAll(/H+/g, result.hours)
        .replaceAll('MSS', result.milliseconds)
        .replaceAll(/M+/g, result.minutes)
        .replaceAll(/S+/g, result.seconds);

    if (isMeridiem) {
        formatted = formatted.replace(/AA/, isPM ? 'PM' : 'AM');
    }

    return formatted;
}
