import {MaskitoOptions} from '@maskito/core';

import {CHAR_EN_DASH, CHAR_NO_BREAK_SPACE} from '../constants';
import {validateDateString} from '../utils';

const DATE_RANGE_SEPARATOR = `${CHAR_NO_BREAK_SPACE}${CHAR_EN_DASH}${CHAR_NO_BREAK_SPACE}`;

export function createValidDatePreprocessor(
    dateModeTemplate: string,
    separator: string,
): NonNullable<MaskitoOptions['preprocessor']> {
    return ({elementState, data}) => {
        const newCharacters = data.replace(/\D+/g, '');

        if (!newCharacters) {
            return {elementState, data: ''};
        }

        const {value, selection} = elementState;
        const [from, rawTo] = selection;
        let to = rawTo + data.length;
        const newPossibleValue = value.slice(0, from) + newCharacters + value.slice(to);
        const dateStrings =
            newPossibleValue
                .replace(DATE_RANGE_SEPARATOR, '')
                .match(new RegExp(`.{1,${dateModeTemplate.length}}`, 'g')) || [];

        let validatedValue = '';
        const hasRangeSeparator = newPossibleValue.includes(DATE_RANGE_SEPARATOR);

        for (const dateString of dateStrings) {
            const {validatedDateString, updatedSelection} = validateDateString({
                dateString,
                dateModeTemplate,
                offset: validatedValue
                    ? validatedValue.length + DATE_RANGE_SEPARATOR.length
                    : 0,
                selection: [from, to],
            });

            if (dateString && !validatedDateString) {
                return {elementState, data: ''}; // prevent changes
            }

            to = updatedSelection[1] + validatedDateString.length - dateString.length;

            validatedValue +=
                hasRangeSeparator && validatedValue
                    ? DATE_RANGE_SEPARATOR + validatedDateString
                    : validatedDateString;
        }

        const newData = validatedValue.slice(from, to);

        return {
            elementState: {
                selection,
                value:
                    validatedValue.slice(0, from) +
                    newData
                        .split(separator)
                        .map(segment => '0'.repeat(segment.length))
                        .join(separator) +
                    validatedValue.slice(to),
            },
            data: newData.replaceAll(separator, ''),
        };
    };
}
