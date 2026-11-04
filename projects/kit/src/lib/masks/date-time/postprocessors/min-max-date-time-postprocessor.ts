import type {MaskitoPostprocessor} from '@maskito/core';

import {DEFAULT_MAX_DATE, DEFAULT_MIN_DATE} from '../../../constants';
import {
    clamp,
    dateToSegments,
    isDateStringComplete,
    parseDateString,
    segmentsToDate,
    toDateString,
} from '../../../utils';
import {clampDayToLastDayOfMonth} from '../../../utils/date/clamp-day-to-last-day-of-month';
import {raiseSegmentValueToMin} from '../../../utils/date/raise-segment-value-to-min';
import {parseTimeString} from '../../../utils/time';
import {type MaskitoTimeParams} from '../../time';
import {type MaskitoDateTimeParams} from '../date-time-params';
import {isDateTimeStringComplete, splitDateTimeString} from '../utils';

export function createMinMaxDateTimePostprocessor({
    dateModeTemplate,
    mode: timeMode,
    separators: timeSeparators,
    min = DEFAULT_MIN_DATE,
    max = DEFAULT_MAX_DATE,
    dateTimeSeparator,
}: Pick<Required<MaskitoDateTimeParams>, 'dateTimeSeparator' | 'max' | 'min'> &
    Pick<Required<MaskitoTimeParams>, 'mode' | 'separators'> & {
        dateModeTemplate: string;
    }): MaskitoPostprocessor {
    const modeYearWidth = dateModeTemplate.replaceAll(/[^y]/g, '').length;

    return ({value, selection}, initialElementState) => {
        const [dateString, timeString] = splitDateTimeString(value, dateModeTemplate);
        const parsedDate = parseDateString(dateString, dateModeTemplate);
        const parsedTime = parseTimeString(timeString, timeMode);
        const [previousDateString = ''] = splitDateTimeString(
            initialElementState.value,
            dateModeTemplate,
        );

        const previousParsedDate = previousDateString
            ? parseDateString(previousDateString, dateModeTemplate)
            : null;

        if (
            !isDateTimeStringComplete(value, {
                dateMode: dateModeTemplate,
                timeMode,
                timeSeparators,
                dateTimeSeparator,
            })
        ) {
            clampDayToLastDayOfMonth(parsedDate, previousParsedDate, modeYearWidth);

            const fixedDate = raiseSegmentValueToMin(parsedDate, dateModeTemplate);

            const {year, month, day} = isDateStringComplete(dateString, dateModeTemplate)
                ? dateToSegments(clamp(segmentsToDate(fixedDate), min, max))
                : fixedDate;

            const fixedValue = toDateString(
                {
                    year,
                    month,
                    day,
                    ...parsedTime,
                },
                {dateMode: dateModeTemplate, dateTimeSeparator, timeMode, timeSeparators},
            );

            const tail = value.slice(fixedValue.length);

            return {
                selection,
                value: `${fixedValue}${tail}`,
            };
        }

        clampDayToLastDayOfMonth(parsedDate, previousParsedDate, modeYearWidth);

        const date = segmentsToDate(parsedDate, parsedTime);
        const clampedDate = clamp(date, min, max);
        // trailing segment separators or meridiem characters
        const [trailingNonDigitCharacters = ''] = value.match(/\D+$/g) || [];

        const validatedValue = `${toDateString(dateToSegments(clampedDate), {
            dateMode: dateModeTemplate,
            dateTimeSeparator,
            timeMode,
            timeSeparators,
        })}${trailingNonDigitCharacters}`;

        return {
            selection,
            value: validatedValue,
        };
    };
}
