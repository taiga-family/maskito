import {DEFAULT_TIME_SEGMENT_MAX_VALUES} from '../../../constants';
import type {MaskitoTimeSegments} from '../../../types';
import {padStartTimeSegments, toTimeString} from '../../../utils/time';
import type {MaskitoTimeParams} from '../time-params';

/**
 * Converts milliseconds to a formatted time string based on the given `options.mode`.
 *
 * @param milliseconds unsigned integer milliseconds
 * @param params
 */
export function maskitoStringifyTime(
    milliseconds: number,
    {mode, separators = [], timeSegmentMaxValues = {}}: MaskitoTimeParams,
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

    const time = toTimeString(result, {mode, separators});

    return hasMeridiem ? `${time}\u00A0${hours >= 12 ? 'PM' : 'AM'}` : time;
}
