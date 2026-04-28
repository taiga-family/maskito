import type {MaskitoPreprocessor} from '@maskito/core';

import {escapeRegExp, parseDateRangeString, validateDateString} from '../utils';

export function createValidDatePreprocessor({
    dateModeTemplate,
    dateSeparator,
    rangeSeparator = '',
}: {
    dateModeTemplate: string;
    dateSeparator: string;
    rangeSeparator?: string;
}): MaskitoPreprocessor {
    return ({elementState, data}) => {
        const {value, selection} = elementState;

        if (data === dateSeparator) {
            return {
                elementState,
                data: selection[0] === value.length ? data : '',
            };
        }

        if (!data.replaceAll(/\D/g, '')) {
            return {elementState, data};
        }

        const newCharacters = data.replaceAll(
            new RegExp(
                String.raw`[^\d${escapeRegExp(dateSeparator)}${rangeSeparator}]`,
                'g',
            ),
            '',
        );

        const [from, rawTo] = selection;
        let to = rawTo + data.length;
        const newPossibleValue = `${value.slice(0, from)}${newCharacters}${value.slice(to)}`;
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
                dateSeparator,
                offset: validatedValue.length,
                selection: [from, to],
            });

            if (dateString && !validatedDateString) {
                return {elementState, data: ''}; // prevent changes
            }

            to = updatedSelection[1];

            validatedValue +=
                hasRangeSeparator && !validatedValue
                    ? `${validatedDateString}${rangeSeparator}`
                    : validatedDateString;
        }

        const newData = validatedValue.slice(from, to);

        return {
            elementState: {
                selection,
                value: `${validatedValue.slice(0, from)}${newData
                    .split(dateSeparator)
                    .map((segment) => '0'.repeat(segment.length))
                    .join(dateSeparator)}${validatedValue.slice(to)}`,
            },
            data: newData,
        };
    };
}
