import {MaskitoOptions} from '@maskito/core';

import {
    clamp,
    dateToSegments,
    isDateStringCompleted,
    parseDateString,
    segmentsToDate,
    splitIntoChunks,
    toDateString,
} from '../utils';

export function createMinMaxDatePostprocessor({
    dateModeTemplate,
    min = new Date('0001-01-01'),
    max = new Date('9999-12-31'),
    datesSeparator = '',
}: {
    dateModeTemplate: string;
    min?: Date;
    max?: Date;
    datesSeparator?: string;
}): NonNullable<MaskitoOptions['postprocessor']> {
    return ({value, selection}) => {
        const dateStrings = splitIntoChunks(
            value.replace(datesSeparator, ''),
            dateModeTemplate.length,
        );

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
            value: validatedValue,
        };
    };
}
