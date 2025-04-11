import {DEFAULT_MAX_DATE, DEFAULT_MIN_DATE} from '../../../constants';
import {clamp} from '../../../utils';
import {maskitoParseDate} from '../../date/utils';
import {maskitoParseTime} from '../../time';
import {DATE_TIME_SEPARATOR} from '../constants';
import type {MaskitoDateTimeParams} from '../date-time-params';

export function maskitoParseDateTime(
    value: string,
    {
        dateMode,
        timeMode,
        min = DEFAULT_MIN_DATE,
        max = DEFAULT_MAX_DATE,
        dateTimeSeparator = DATE_TIME_SEPARATOR,
    }: MaskitoDateTimeParams,
): Date | null {
    const modeLength = dateMode.length + dateTimeSeparator.length + timeMode.length;

    if (value.length !== modeLength) {
        return null;
    }

    const [dateSegment, timeSegment] = value.split(dateTimeSeparator);

    if (!dateSegment || !timeSegment) {
        return null;
    }

    const date = maskitoParseDate(dateSegment, {mode: dateMode});

    if (!date) {
        return null;
    }

    const time = maskitoParseTime(timeSegment, {mode: timeMode});

    if (time === null || time === undefined) {
        return null;
    }

    const dateTime = new Date(Number(date) + time);

    return clamp(dateTime, min, max);
}
