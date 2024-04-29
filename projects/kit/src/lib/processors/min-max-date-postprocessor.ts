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

export function createMinMaxDatePostprocessor({
    dateModeTemplate,
    min = DEFAULT_MIN_DATE,
    max = DEFAULT_MAX_DATE,
    rangeSeparator = '',
}: {
    dateModeTemplate: string;
    min?: Date;
    max?: Date;
    rangeSeparator?: string;
}): MaskitoPostprocessor {
    return ({value, selection}) => {
        const endsWithRangeSeparator = rangeSeparator && value.endsWith(rangeSeparator);
        const dateStrings = parseDateRangeString(value, dateModeTemplate, rangeSeparator);

        let validatedValue = '';

        for (const dateString of dateStrings) {
            validatedValue += validatedValue ? rangeSeparator : '';

            const parsedDate = parseDateString(dateString, dateModeTemplate);

            if (!isDateStringComplete(dateString, dateModeTemplate)) {
                validatedValue += dateString;
                continue;
            }

            const clampedDate = clamp(segmentsToDate(parsedDate), min, max);

            validatedValue +=
                clampedDate.getTime() === min.getTime() ||
                clampedDate.getTime() === max.getTime()
                    ? toDateString(dateToSegments(clampedDate), {
                          dateMode: dateModeTemplate,
                      })
                    : dateString;
        }

        return {
            selection,
            value: validatedValue + (endsWithRangeSeparator ? rangeSeparator : ''),
        };
    };
}
