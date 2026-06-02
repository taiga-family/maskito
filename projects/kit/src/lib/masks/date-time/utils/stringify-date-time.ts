import {clamp} from '../../../utils';
import {maskitoStringifyDate, withDateDefaults} from '../../date/utils';
import {maskitoStringifyTime} from '../../time';
import {withTimeDefaults} from '../../time/utils/with-time-defaults';
import {DATE_TIME_SEPARATOR} from '../constants';
import type {MaskitoDateTimeParams} from '../date-time-params';

export function maskitoStringifyDateTime(
    date: Date,
    {
        locale,
        dateMode,
        timeMode = 'HH:MM',
        dateSeparator,
        dateTimeSeparator = DATE_TIME_SEPARATOR,
        ...params
    }: MaskitoDateTimeParams,
): string {
    const dateParams = withDateDefaults(
        locale
            ? {...params, locale, mode: dateMode, separator: dateSeparator}
            : {...params, mode: dateMode!, separator: dateSeparator},
    );

    const timeParams = withTimeDefaults({...params, locale, mode: timeMode});
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
