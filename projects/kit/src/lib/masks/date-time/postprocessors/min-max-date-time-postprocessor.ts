import type {MaskitoPostprocessor} from '@maskito/core';

import {DEFAULT_MAX_DATE, DEFAULT_MIN_DATE} from '../../../constants';
import type {MaskitoTimeMode} from '../../../types';
import {
    clamp,
    dateToSegments,
    isDateStringComplete,
    parseDateString,
    segmentsToDate,
    toDateString,
} from '../../../utils';
import {raiseSegmentValueToMin} from '../../../utils/date/raise-segment-value-to-min';
import {parseTimeString} from '../../../utils/time';
import {isDateTimeStringComplete, parseDateTimeString} from '../utils';

export function createMinMaxDateTimePostprocessor({
    dateModeTemplate,
    timeMode,
    min = DEFAULT_MIN_DATE,
    max = DEFAULT_MAX_DATE,
    dateTimeSeparator,
}: {
    dateModeTemplate: string;
    timeMode: MaskitoTimeMode;
    min?: Date;
    max?: Date;
    dateTimeSeparator: string;
}): MaskitoPostprocessor {
    return ({value, selection}) => {
        const [dateString, timeString] = parseDateTimeString(value, {
            dateModeTemplate,
            dateTimeSeparator,
        });
        const parsedDate = parseDateString(dateString, dateModeTemplate);
        const parsedTime = parseTimeString(timeString);

        if (
            !isDateTimeStringComplete(value, {
                dateMode: dateModeTemplate,
                timeMode,
                dateTimeSeparator,
            })
        ) {
            const fixedDate = raiseSegmentValueToMin(parsedDate, dateModeTemplate);

            if (!isDateStringComplete(dateString, dateModeTemplate)) {
                return {
                    value,
                    selection,
                };
            }

            const clampedDate = clamp(segmentsToDate(fixedDate), min, max);
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
                {dateMode: dateModeTemplate, dateTimeSeparator, timeMode},
            );
            const tail = value.slice(fixedValue.length);

            return {
                selection,
                value:
                    clampedDate.getTime() === min.getTime() ||
                    clampedDate.getTime() === max.getTime()
                        ? fixedValue + tail
                        : value,
            };
        }

        const date = segmentsToDate(parsedDate, parsedTime);
        const clampedDate = clamp(date, min, max);

        const validatedValue = toDateString(dateToSegments(clampedDate), {
            dateMode: dateModeTemplate,
            dateTimeSeparator,
            timeMode,
        });

        return {
            selection,
            value:
                clampedDate.getTime() === min.getTime() ||
                clampedDate.getTime() === max.getTime()
                    ? validatedValue
                    : value,
        };
    };
}
