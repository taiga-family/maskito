import type {MaskitoPreprocessor} from '@maskito/core';

import {
    escapeRegExp,
    padIncompleteDateSegment,
    parseDateRangeString,
    validateDateString,
} from '../utils';
import {skipNonDigitCharacters} from '../utils/skip-non-digit-characters';

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
            if (selection[0] !== value.length) {
                return {elementState, data: ''};
            }

            const dateStrings = parseDateRangeString(
                value,
                dateModeTemplate,
                rangeSeparator,
            );

            const dateString = dateStrings[dateStrings.length - 1] ?? '';
            const paddedDateString = padIncompleteDateSegment({
                dateString,
                dateModeTemplate,
                dateSeparator,
            });

            const caretShift = paddedDateString.length - dateString.length;

            return {
                elementState: caretShift
                    ? {
                          value: `${value.slice(0, -dateString.length)}${paddedDateString}`,
                          selection: [
                              selection[0] + caretShift,
                              selection[1] + caretShift,
                          ],
                      }
                    : elementState,
                data,
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

        const [from, rawTo] = skipNonDigitCharacters(value, selection);
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
                selection: [from, rawTo],
                value: `${validatedValue.slice(0, from)}${newData
                    .split(dateSeparator)
                    .map((segment) => '0'.repeat(segment.length))
                    .join(dateSeparator)}${validatedValue.slice(to)}`,
            },
            data: newData,
        };
    };
}
