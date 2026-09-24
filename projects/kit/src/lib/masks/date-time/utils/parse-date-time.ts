import {clamp} from '../../../utils';
import {maskitoParseDate, maskitoWithDateDefaults} from '../../date/utils';
import {maskitoParseTime} from '../../time';
import {maskitoWithTimeDefaults} from '../../time/utils/with-time-defaults';
import {DATE_TIME_SEPARATOR} from '../constants';
import type {MaskitoDateTimeParams} from '../date-time-params';

export function maskitoParseDateTime(
    value: string,
    {
        locale,
        dateMode,
        timeMode = 'HH:MM',
        dateSeparator,
        timeSeparators,
        dateTimeSeparator = DATE_TIME_SEPARATOR,
        ...params
    }: MaskitoDateTimeParams,
): Date | null {
    const dateParams = maskitoWithDateDefaults(
        locale
            ? {...params, separator: dateSeparator, mode: dateMode, locale}
            : {...params, separator: dateSeparator, mode: dateMode!},
    );

    const timeParams = maskitoWithTimeDefaults({
        ...params,
        locale,
        mode: timeMode,
        separators: timeSeparators,
    });

    const [dateSegment = '', ...timeSegments] = value.split(dateTimeSeparator);
    const timeSegment = timeSegments.join(dateTimeSeparator);
    const digitsPattern = timeParams.mode.replaceAll(/[^HMS]/g, '');
    const digits = timeSegment.replaceAll(/\D+/g, '');

    if (digits.length !== digitsPattern.length) {
        return null;
    }

    const date = maskitoParseDate(dateSegment, {
        ...dateParams,
        // Skip bounds here — clamp the whole date + time once at the end instead
        min: undefined,
        max: undefined,
    });

    const time = maskitoParseTime(timeSegment, timeParams);

    if (!date) {
        return null;
    }

    const dateTime = new Date(Number(date) + time);

    return dateParams.mode.includes('y')
        ? clamp(dateTime, dateParams.min, dateParams.max)
        : dateTime;
}
