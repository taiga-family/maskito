import {hasDayPeriod, padStartTimeSegments, parseTimeString} from '../../../utils/time';
import type {MaskitoTimeParams} from '../time-params';
import {withTimeDefaults} from './with-time-defaults';

/**
 * Converts a formatted time string to milliseconds based on the given `options.mode`.
 *
 * @param maskedTime a formatted time string by {@link maskitoTimeOptionsGenerator} or {@link maskitoStringifyTime}
 * @param params
 */
export function maskitoParseTime(maskedTime: string, params: MaskitoTimeParams): number {
    const {mode, dayPeriod, timeSegmentMaxValues} = withTimeDefaults(params);
    const msInSecond = timeSegmentMaxValues.milliseconds + 1;
    const msInMinute = (timeSegmentMaxValues.seconds + 1) * msInSecond;
    const msInHour = (timeSegmentMaxValues.minutes + 1) * msInMinute;
    const parsedTime = padStartTimeSegments(parseTimeString(maskedTime, mode));
    let hours = Number(parsedTime.hours ?? '');

    if (hasDayPeriod(dayPeriod) && Number.isFinite(hours)) {
        if (maskedTime.includes(dayPeriod[1])) {
            hours = hours < 12 ? hours + 12 : hours;
        } else {
            hours = hours === 12 ? 0 : hours;
        }
    }

    return (
        hours * msInHour +
        Number(parsedTime.minutes ?? '') * msInMinute +
        Number(parsedTime.seconds ?? '') * msInSecond +
        Number(parsedTime.milliseconds ?? '')
    );
}
