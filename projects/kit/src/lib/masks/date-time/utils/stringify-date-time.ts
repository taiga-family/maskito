import {DEFAULT_MAX_DATE, DEFAULT_MIN_DATE} from '../../../constants';
import {clamp} from '../../../utils';
import {maskitoStringifyDate} from '../../date/utils';
import {maskitoStringifyTime} from '../../time';
import {DATE_TIME_SEPARATOR} from '../constants';
import type {MaskitoDateTimeParams} from '../date-time-params';

export function maskitoStringifyDateTime(
    date: Date,
    {
        dateMode,
        timeMode,
        dateTimeSeparator = DATE_TIME_SEPARATOR,
        dateSeparator = '.',
        min = DEFAULT_MIN_DATE,
        max = DEFAULT_MAX_DATE,
    }: MaskitoDateTimeParams,
): string {
    const validatedDate = clamp(date, min, max);

    const dateString = maskitoStringifyDate(validatedDate, {
        mode: dateMode,
        separator: dateSeparator,
        min,
        max,
    });
    const timeString = maskitoStringifyTime(
        validatedDate.getHours() * 3600000 +
            validatedDate.getMinutes() * 60000 +
            validatedDate.getSeconds() * 1000 +
            validatedDate.getMilliseconds(),
        {
            mode: timeMode,
        },
    );

    return `${dateString}${dateTimeSeparator}${timeString}`;
}
