import type {MaskitoPostprocessor} from '@maskito/core';

import {DEFAULT_MAX_DATE, DEFAULT_MIN_DATE} from '../../../constants';
import type {MaskitoTimeMode} from '../../../types';
import {
    clamp,
    isDateStringComplete,
    parseDateString,
    segmentsToDate,
    strictDateTimeModeValidation,
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

            const {year, month, day} = strictDateTimeModeValidation({
                clampedDate: clamp(segmentsToDate(fixedDate), min, max),
                min,
                max,
                strict,
                dateSegments: fixedDate,
                isDateComplete: isDateStringComplete(dateString, dateModeTemplate),
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

        const validatedValue = toDateString(
            strictDateTimeModeValidation({
                clampedDate,
                min,
                max,
                strict,
                dateSegments: parsedDate,
                timeSegments: parsedTime,
            }),
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
    };
}
