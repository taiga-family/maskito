import {MaskitoOptions} from '@maskito/core';

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
    datesSeparator = '',
    separator = '.',
}: {
    dateModeTemplate: string;
    min?: Date;
    max?: Date;
    datesSeparator?: string;
    separator?: string;
}): NonNullable<MaskitoOptions['postprocessor']> {
    return ({value, selection}) => {
        const endsWithDatesSeparator = datesSeparator && value.endsWith(datesSeparator);
        const dateStrings = parseDateRangeString(value, dateModeTemplate, datesSeparator);

        let validatedValue = '';

        for (const dateString of dateStrings) {
            validatedValue += validatedValue ? datesSeparator : '';

            if (!isDateStringComplete(dateString, dateModeTemplate)) {
                const parsedDate = parseDateString(dateString, dateModeTemplate);
                const fixedValue = toDateString(parsedDate, dateModeTemplate);
                const tail = dateString.endsWith(separator) ? separator : '';

                validatedValue += fixedValue + tail;
                continue;
            }

            const parsedDate = parseDateString(dateString, dateModeTemplate);
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
