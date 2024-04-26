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
import {raiseSegmentValueToMin} from '../utils/date/raise-segment-value-to-min';

export function createMinMaxDatePostprocessor({
    dateModeTemplate,
    min = DEFAULT_MIN_DATE,
    max = DEFAULT_MAX_DATE,
    rangeSeparator = '',
    dateSegmentSeparator = '.',
    strict = true,
}: {
    dateModeTemplate: string;
    min?: Date;
    max?: Date;
    rangeSeparator?: string;
    dateSegmentSeparator?: string;
    strict?: boolean;
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

            const date = segmentsToDate(parsedDate);
            const clampedDate = clamp(date, min, max);

            if (!strict) {
                validatedValue += toDateString(
                    clampedDate.getTime() === max.getTime() ||
                        clampedDate.getTime() === min.getTime()
                        ? dateToSegments(clampedDate)
                        : parsedDate,
                    {dateMode: dateModeTemplate},
                );

                continue;
            }

            validatedValue += toDateString(dateToSegments(clampedDate), {
                dateMode: dateModeTemplate,
            });
        }

        return {
            selection,
            value: validatedValue + (endsWithRangeSeparator ? rangeSeparator : ''),
        };
    };
}
