import {MaskitoOptions} from '@maskito/core';

import {POSSIBLE_DATES_SEPARATOR} from '../constants';
import {escapeRegExp, parseDateRangeString, validateDateString} from '../utils';

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
        const {value, selection} = elementState;

        if (data === dateSegmentsSeparator) {
            return {
                elementState,
                data: selection[0] === value.length ? data : '',
            };
        }

        if (POSSIBLE_DATES_SEPARATOR.includes(data)) {
            return {elementState, data: datesSeparator};
        }

        const newCharacters = data.replace(
            new RegExp(
                `[^\\d${escapeRegExp(dateSegmentsSeparator)}${datesSeparator}]`,
                'g',
            ),
            '',
        );

        if (!newCharacters) {
            return {elementState, data: ''};
        }

        const [from, rawTo] = selection;
        let to = rawTo + data.length;
        const newPossibleValue = value.slice(0, from) + newCharacters + value.slice(to);
        const dateStrings = parseDateRangeString(
            newPossibleValue,
            dateModeTemplate,
            datesSeparator,
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

            to = updatedSelection[1];

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
            data: newData,
        };
    };
}
