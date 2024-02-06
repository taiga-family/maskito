import {MaskitoPreprocessor} from '@maskito/core';

import {escapeRegExp, parseDateRangeString, validateDateString} from '../utils';

export function createValidDatePreprocessor({
    dateModeTemplate,
    dateSegmentsSeparator,
    rangeSeparator = '',
}: {
    dateModeTemplate: string;
    dateSegmentsSeparator: string;
    rangeSeparator?: string;
}): MaskitoPreprocessor {
    return ({elementState, data}) => {
        const {value, selection} = elementState;

        if (data === dateSegmentsSeparator) {
            return {
                elementState,
                data: selection[0] === value.length ? data : '',
            };
        }

        const newCharacters = data.replace(
            new RegExp(
                `[^\\d${escapeRegExp(dateSegmentsSeparator)}${rangeSeparator}]`,
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
            rangeSeparator,
        );

        let validatedValue = '';
        const hasRangeSeparator =
            Boolean(rangeSeparator) && newPossibleValue.includes(rangeSeparator);

        for (const dateString of dateStrings) {
            const {validatedDateString, updatedSelection} = validateDateString({
                dateString,
                dateModeTemplate,
                offset: validatedValue
                    ? validatedValue.length + rangeSeparator.length
                    : 0,
                selection: [from, to],
            });

            if (dateString && !validatedDateString) {
                return {elementState, data: ''}; // prevent changes
            }

            to = updatedSelection[1];

            validatedValue +=
                hasRangeSeparator && validatedValue
                    ? rangeSeparator + validatedDateString
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
