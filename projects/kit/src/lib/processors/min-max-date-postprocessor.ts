import {MaskitoOptions} from '@maskito/core';

import {
    clamp,
    dateToSegments,
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
    return elementState => {
        const {value, selection} = elementState;

        const dateStrings = splitIntoChunks(
            value.replace(datesSeparator, ''),
            dateModeTemplate.length,
        );

        let validatedValue = '';

        for (const dateString of dateStrings) {
            validatedValue += validatedValue ? datesSeparator : '';

            if (dateString.length < dateModeTemplate.length) {
                validatedValue += dateString;
                continue;
            }

            const parsedDate = parseDateString(dateString, dateModeTemplate);

            if (parsedDate.day === '00' || parsedDate.month === '00') {
                validatedValue += dateString;
                continue;
            }

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
