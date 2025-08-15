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
    const hasMeridiem = mode.includes('AA');

    const msInSecond = maxValues.milliseconds + 1;
    const msInMinute = (maxValues.seconds + 1) * msInSecond;
    const msInHour = (maxValues.minutes + 1) * msInMinute;

    const hours = Math.trunc(milliseconds / msInHour);

    milliseconds -= hours * msInHour;

    const minutes = Math.trunc(milliseconds / msInMinute);

    milliseconds -= minutes * msInMinute;

    const seconds = Math.trunc(milliseconds / msInSecond);

    milliseconds -= seconds * msInSecond;

    const result = padStartTimeSegments({
        hours: hasMeridiem ? hours % 12 || 12 : hours,
        minutes,
        seconds,
        milliseconds,
    });

    return mode
        .replaceAll(/H+/g, result.hours)
        .replaceAll('MSS', result.milliseconds)
        .replaceAll(/M+/g, result.minutes)
        .replaceAll(/S+/g, result.seconds)
        .replace('AA', hours >= 12 ? 'PM' : 'AM');
}
