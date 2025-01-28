import type {MaskitoPostprocessor} from '@maskito/core';

import {DEFAULT_MAX_DATE, DEFAULT_MIN_DATE} from '../constants';
import {
    clamp,
    dateToSegments,
    isDateStringComplete,
    parseDateRangeString,
    parseDateString,
    segmentsToDate,
    toDateString,
} from '../utils';
import {isCalendarDate} from '../utils/date/is-calendar-date';
import {raiseSegmentValueToMin} from '../utils/date/raise-segment-value-to-min';

export function createMinMaxDatePostprocessor({
    dateModeTemplate,
    min = DEFAULT_MIN_DATE,
    max = DEFAULT_MAX_DATE,
    rangeSeparator = '',
    dateSegmentSeparator = '.',
}: {
    dateModeTemplate: string;
    min?: Date;
    max?: Date;
    rangeSeparator?: string;
    dateSegmentSeparator?: string;
}): MaskitoPostprocessor {
    return ({value, selection}) => {
        const endsWithRangeSeparator = rangeSeparator && value.endsWith(rangeSeparator);
        const dateStrings = parseDateRangeString(value, dateModeTemplate, rangeSeparator);

        let validatedValue = '';

        for (const dateString of dateStrings) {
            validatedValue += validatedValue ? rangeSeparator : '';

            const parsedDate = parseDateString(dateString, dateModeTemplate);

            if (!isDateStringComplete(dateString, dateModeTemplate)) {
                const fixedDate = raiseSegmentValueToMin(parsedDate, dateModeTemplate);

                const fixedValue = toDateString(fixedDate, {dateMode: dateModeTemplate});
                const tail = dateString.endsWith(dateSegmentSeparator)
                    ? dateSegmentSeparator
                    : '';

                validatedValue += fixedValue + tail;
                continue;
            }

            if (isCalendarDate(dateModeTemplate, dateSegmentSeparator)) {
                const date = segmentsToDate(parsedDate);

                const clampedDate = clamp(date, min, max);

                validatedValue += toDateString(dateToSegments(clampedDate), {
                    dateMode: dateModeTemplate,
                });
            } else {
                validatedValue += dateString;
            }
        }

        return {
            selection,
            value: validatedValue + (endsWithRangeSeparator ? rangeSeparator : ''),
        };
    };
}
