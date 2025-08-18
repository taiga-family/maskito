import {DEFAULT_TIME_SEGMENT_MAX_VALUES} from '../../../constants';
import type {MaskitoTimeSegments} from '../../../types';
import {padEndTimeSegments, parseTimeString} from '../../../utils/time';
import type {MaskitoTimeParams} from '../time-params';

/**
 * Converts a formatted time string to milliseconds based on the given `options.mode`.
 *
 * @param maskedTime a formatted time string by {@link maskitoTimeOptionsGenerator} or {@link maskitoStringifyTime}
 * @param params
 */
export function maskitoParseTime(
    maskedTime: string,
    {mode, timeSegmentMaxValues = {}}: MaskitoTimeParams,
): number {
    const maxValues: MaskitoTimeSegments<number> = {
        ...DEFAULT_TIME_SEGMENT_MAX_VALUES,
        ...timeSegmentMaxValues,
    };

    const msInSecond = maxValues.milliseconds + 1;
    const msInMinute = (maxValues.seconds + 1) * msInSecond;
    const msInHour = (maxValues.minutes + 1) * msInMinute;

    const parsedTime = padEndTimeSegments(parseTimeString(maskedTime, mode));
    let hours = Number(parsedTime.hours ?? '');

    if (mode.includes('AA') && Number.isFinite(hours)) {
        if (maskedTime.includes('PM')) {
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
