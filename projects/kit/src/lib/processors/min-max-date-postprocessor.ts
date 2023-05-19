import {MaskitoPostprocessor} from '@maskito/core';

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
    datesSeparator = '',
    dateSegmentSeparator = '.',
}: {
    dateModeTemplate: string;
    min?: Date;
    max?: Date;
    datesSeparator?: string;
    dateSegmentSeparator?: string;
}): MaskitoPostprocessor {
    return ({value, selection}) => {
        const endsWithDatesSeparator = datesSeparator && value.endsWith(datesSeparator);
        const dateStrings = parseDateRangeString(value, dateModeTemplate, datesSeparator);

        let validatedValue = '';

        for (const dateString of dateStrings) {
            validatedValue += validatedValue ? datesSeparator : '';

            const parsedDate = parseDateString(dateString, dateModeTemplate);

            if (!isDateStringComplete(dateString, dateModeTemplate)) {
                const fixedDate = raiseSegmentValueToMin(parsedDate, dateModeTemplate);

                const fixedValue = toDateString(fixedDate, dateModeTemplate);
                const tail = dateString.endsWith(dateSegmentSeparator)
                    ? dateSegmentSeparator
                    : '';

                validatedValue += fixedValue + tail;
                continue;
            }

            const date = segmentsToDate(parsedDate);
            const clampedDate = clamp(date, min, max);

            validatedValue += toDateString(dateToSegments(clampedDate), dateModeTemplate);
        }

        return {
            selection,
            value: validatedValue + (endsWithDatesSeparator ? datesSeparator : ''),
        };
    };
}
