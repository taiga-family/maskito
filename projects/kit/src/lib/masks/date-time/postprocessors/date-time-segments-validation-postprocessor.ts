import type {MaskitoPostprocessor} from '@maskito/core';

import type {MaskitoTimeMode} from '../../../types';
import {
    isDateStringComplete,
    parseDateString,
    segmentsToDate,
    strictDateTimeModeValidation,
    toDateString,
} from '../../../utils';
import {raiseSegmentValueToMin} from '../../../utils/date/raise-segment-value-to-min';
import {parseTimeString} from '../../../utils/time';
import {isDateTimeStringComplete, parseDateTimeString} from '../utils';

export function createDateTimeSegmentsValidationPostProcessor({
    dateModeTemplate,
    timeMode,
    dateTimeSeparator,
    strict,
}: {
    dateModeTemplate: string;
    timeMode: MaskitoTimeMode;
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
                date: segmentsToDate(fixedDate),
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

        const validatedValue = toDateString(
            strictDateTimeModeValidation({
                date: segmentsToDate(parsedDate, parsedTime),
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
