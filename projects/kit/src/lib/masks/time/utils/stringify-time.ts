import {CHAR_NO_BREAK_SPACE} from '../../../constants';
import {hasDayPeriod, padStartTimeSegments, toTimeString} from '../../../utils/time';
import type {MaskitoTimeParams} from '../time-params';
import {withTimeDefaults} from './with-time-defaults';

/**
 * Converts milliseconds to a formatted time string based on the given `options.mode`.
 *
 * @param milliseconds unsigned integer milliseconds
 * @param params
 */
export function maskitoStringifyTime(
    milliseconds: number,
    params: MaskitoTimeParams,
): string {
    const {mode, separators, dayPeriod, timeSegmentMaxValues} = withTimeDefaults(params);
    const hasMeridiem = hasDayPeriod(dayPeriod);
    const msInSecond = timeSegmentMaxValues.milliseconds + 1;
    const msInMinute = (timeSegmentMaxValues.seconds + 1) * msInSecond;
    const msInHour = (timeSegmentMaxValues.minutes + 1) * msInMinute;
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

    return hasMeridiem
        ? `${time}${CHAR_NO_BREAK_SPACE}${dayPeriod[hours >= 12 ? 1 : 0]}`
        : time;
}
