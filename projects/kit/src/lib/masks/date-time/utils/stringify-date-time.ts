import {clamp} from '../../../utils';
import {maskitoStringifyDate, maskitoWithDateDefaults} from '../../date/utils';
import {maskitoStringifyTime} from '../../time';
import {maskitoWithTimeDefaults} from '../../time/utils/with-time-defaults';
import {DATE_TIME_SEPARATOR} from '../constants';
import type {MaskitoDateTimeParams} from '../date-time-params';

export function maskitoStringifyDateTime(
    date: Date,
    {
        locale,
        dateMode,
        timeMode = 'HH:MM',
        dateSeparator,
        timeSeparators,
        dateTimeSeparator = DATE_TIME_SEPARATOR,
        ...params
    }: MaskitoDateTimeParams,
): string {
    const dateParams = maskitoWithDateDefaults(
        locale
            ? {...params, locale, mode: dateMode, separator: dateSeparator}
            : {...params, mode: dateMode!, separator: dateSeparator},
    );

    const timeParams = maskitoWithTimeDefaults({
        ...params,
        locale,
        mode: timeMode,
        separators: timeSeparators,
    });

    const validatedDate = clamp(date, dateParams.min, dateParams.max);
    const dateString = maskitoStringifyDate(validatedDate, dateParams);

    const extractedTime =
        Number(validatedDate) -
        Number(
            new Date(
                validatedDate.getFullYear(),
                validatedDate.getMonth(),
                validatedDate.getDate(),
            ),
        );

    const timeString = maskitoStringifyTime(extractedTime, timeParams);

    return `${dateString}${dateTimeSeparator}${timeString}`;
}
