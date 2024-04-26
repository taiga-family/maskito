import type {MaskitoPostprocessor} from '@maskito/core';

import {DEFAULT_MAX_DATE, DEFAULT_MIN_DATE} from '../../../constants';
import type {MaskitoDateSegments, MaskitoTimeMode} from '../../../types';
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
    strict,
}: {
    dateModeTemplate: string;
    timeMode: MaskitoTimeMode;
    min?: Date;
    max?: Date;
    dateTimeSeparator: string;
    strict: boolean;
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
            const {year, month, day} = getDateSegments({
                strict,
                fixedDate,
                dateModeTemplate,
                dateString,
                min,
                max,
            });

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
                value: fixedValue + tail,
            };
        }

        const date = segmentsToDate(parsedDate, parsedTime);
        const clampedDate = clamp(date, min, max);

        if (!strict) {
            const validatedValue = toDateString(
                clampedDate.getTime() === min.getTime() ||
                    clampedDate.getTime() === max.getTime()
                    ? dateToSegments(clampedDate)
                    : {...parsedDate, ...parsedTime},
                {
                    dateMode: dateModeTemplate,
                    dateTimeSeparator,
                    timeMode,
                },
            );

            return {
                selection,
                value: validatedValue,
            };
        }

        const validatedValue = toDateString(dateToSegments(clampedDate), {
            dateMode: dateModeTemplate,
            dateTimeSeparator,
            timeMode,
        });

        return {
            selection,
            value: validatedValue,
        };
    };
}

function getDateSegments({
    strict,
    dateModeTemplate,
    dateString,
    fixedDate,
    min,
    max,
}: {
    strict: boolean;
    dateModeTemplate: string;
    dateString: string;
    fixedDate: Partial<MaskitoDateSegments>;
    min: Date;
    max: Date;
}): Partial<MaskitoDateSegments> {
    const isComplete = isDateStringComplete(dateString, dateModeTemplate);
    const clampedDate = clamp(segmentsToDate(fixedDate), min, max);

    if (strict) {
        return isComplete ? dateToSegments(clampedDate) : fixedDate;
    }

    if (!isComplete) {
        return fixedDate;
    }

    return clampedDate.getTime() === min.getTime() ||
        clampedDate.getTime() === max.getTime()
        ? dateToSegments(clampedDate)
        : fixedDate;
}
