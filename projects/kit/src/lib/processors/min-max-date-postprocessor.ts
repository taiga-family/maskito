import {MaskitoOptions} from '@maskito/core';

import {DEFAULT_MAX_DATE, DEFAULT_MIN_DATE} from '../constants';
import {
    clamp,
    dateToSegments,
    isDateStringCompleted,
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
}: {
    dateModeTemplate: string;
    min?: Date;
    max?: Date;
    datesSeparator?: string;
}): NonNullable<MaskitoOptions['postprocessor']> {
    return ({value, selection}) => {
        const endsWithDatesSeparator = datesSeparator && value.endsWith(datesSeparator);
        const dateStrings = parseDateRangeString(value, dateModeTemplate, datesSeparator);

        let validatedValue = '';

        for (const dateString of dateStrings) {
            validatedValue += validatedValue ? datesSeparator : '';

            if (!isDateStringCompleted(dateString, dateModeTemplate)) {
                validatedValue += dateString;
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
