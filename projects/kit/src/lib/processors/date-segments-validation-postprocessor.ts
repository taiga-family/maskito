import type {MaskitoPostprocessor} from '@maskito/core';

import {isDateStringComplete} from '../utils/date/is-date-string-complete';
import {parseDateRangeString} from '../utils/date/parse-date-range-string';
import {parseDateString} from '../utils/date/parse-date-string';
import {raiseSegmentValueToMin} from '../utils/date/raise-segment-value-to-min';
import {segmentsToDate} from '../utils/date/segments-to-date';
import {strictDateTimeModeValidation} from '../utils/date/strict-date-time-mode-validation';
import {toDateString} from '../utils/date/to-date-string';

export function createDateSegmentsValidationPostprocessor({
    dateModeTemplate,
    rangeSeparator = '',
    dateSegmentSeparator = '.',
    strict,
}: {
    dateModeTemplate: string;
    rangeSeparator?: string;
    dateSegmentSeparator?: string;
    strict: boolean;
}): MaskitoPostprocessor {
    return ({value, selection}) => {
        const endsWithRangeSeparator = rangeSeparator && value.endsWith(rangeSeparator);
        const dateStrings = parseDateRangeString(value, dateModeTemplate, rangeSeparator);

        let validatedValue = '';

        for (const dateString of dateStrings) {
            validatedValue += validatedValue ? rangeSeparator : '';

            const parsedDateSegments = parseDateString(dateString, dateModeTemplate);

            if (!isDateStringComplete(dateString, dateModeTemplate)) {
                const fixedDateSegments = raiseSegmentValueToMin(
                    parsedDateSegments,
                    dateModeTemplate,
                );

                const fixedValue = toDateString(fixedDateSegments, {
                    dateMode: dateModeTemplate,
                });
                const tail = dateString.endsWith(dateSegmentSeparator)
                    ? dateSegmentSeparator
                    : '';

                validatedValue += fixedValue + tail;
                continue;
            }

            validatedValue += toDateString(
                strictDateTimeModeValidation({
                    date: segmentsToDate(parsedDateSegments),
                    strict,
                    dateSegments: parsedDateSegments,
                }),
                {
                    dateMode: dateModeTemplate,
                },
            );
        }

        return {
            selection,
            value: validatedValue + (endsWithRangeSeparator ? rangeSeparator : ''),
        };
    };
}
