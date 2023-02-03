import {MaskitoOptions} from '@maskito/core';

import {splitIntoChunks, validateDateString} from '../utils';

export function createValidDatePreprocessor({
    dateModeTemplate,
    dateSegmentsSeparator,
    datesSeparator = '',
}: {
    dateModeTemplate: string;
    dateSegmentsSeparator: string;
    datesSeparator?: string;
}): NonNullable<MaskitoOptions['preprocessor']> {
    return ({elementState, data}) => {
        const newCharacters = data.replace(/\D+/g, '');

        if (!newCharacters) {
            return {elementState, data: ''};
        }

        const {value, selection} = elementState;
        const [from, rawTo] = selection;
        let to = rawTo + data.length;
        const newPossibleValue = value.slice(0, from) + newCharacters + value.slice(to);
        const dateStrings = splitIntoChunks(
            newPossibleValue.replace(datesSeparator, ''),
            dateModeTemplate.length,
        );

        let validatedValue = '';
        const hasRangeSeparator =
            Boolean(datesSeparator) && newPossibleValue.includes(datesSeparator);

        for (const dateString of dateStrings) {
            const {validatedDateString, updatedSelection} = validateDateString({
                dateString,
                dateModeTemplate,
                offset: validatedValue
                    ? validatedValue.length + datesSeparator.length
                    : 0,
                selection: [from, to],
            });

            if (dateString && !validatedDateString) {
                return {elementState, data: ''}; // prevent changes
            }

            to = updatedSelection[1] + validatedDateString.length - dateString.length;

            validatedValue +=
                hasRangeSeparator && validatedValue
                    ? datesSeparator + validatedDateString
                    : validatedDateString;
        }

        const newData = validatedValue.slice(from, to);

        return {
            elementState: {
                selection,
                value:
                    validatedValue.slice(0, from) +
                    newData
                        .split(dateSegmentsSeparator)
                        .map(segment => '0'.repeat(segment.length))
                        .join(dateSegmentsSeparator) +
                    validatedValue.slice(to),
            },
            data: newData.replace(new RegExp(`\\${dateSegmentsSeparator}`, 'g'), ''),
        };
    };
}
