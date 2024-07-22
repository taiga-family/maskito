import type {MaskitoPreprocessor} from '@maskito/core';

import {DEFAULT_TIME_SEGMENT_MAX_VALUES, TIME_FIXED_CHARACTERS} from '../../../constants';
import type {MaskitoTimeMode} from '../../../types';
import {escapeRegExp, validateDateString} from '../../../utils';
import {padEndTimeSegments, validateTimeString} from '../../../utils/time';
import {parseDateTimeString} from '../utils';

export function createValidDateTimePreprocessor({
    dateModeTemplate,
    dateSegmentsSeparator,
    dateTimeSeparator,
    timeMode,
}: {
    dateModeTemplate: string;
    dateSegmentsSeparator: string;
    dateTimeSeparator: string;
    timeMode: MaskitoTimeMode;
}): MaskitoPreprocessor {
    const invalidCharsRegExp = new RegExp(
        `[^\\d${TIME_FIXED_CHARACTERS.map(escapeRegExp).join('')}${escapeRegExp(
            dateSegmentsSeparator,
        )}]+`,
    );

    return ({elementState, data}) => {
        const {value, selection} = elementState;

        if (data === dateSegmentsSeparator) {
            return {
                elementState,
                data: selection[0] === value.length ? data : '',
            };
        }

        const newCharacters = data.replace(invalidCharsRegExp, '');

        if (!newCharacters) {
            return {elementState, data: ''};
        }

        const [from, rawTo] = selection;
        let to = rawTo + data.length;
        const newPossibleValue = value.slice(0, from) + newCharacters + value.slice(to);

        const [dateString, timeString] = parseDateTimeString(newPossibleValue, {
            dateModeTemplate,
            dateTimeSeparator,
        });
        let validatedValue = '';
        const hasDateTimeSeparator = newPossibleValue.includes(dateTimeSeparator);

        const {validatedDateString, updatedSelection} = validateDateString({
            dateString,
            dateSegmentsSeparator,
            dateModeTemplate,
            offset: 0,
            selection: [from, to],
        });

        if (dateString && !validatedDateString) {
            return {elementState, data: ''}; // prevent changes
        }

        to = updatedSelection[1];

        validatedValue += validatedDateString;

        const paddedMaxValues = padEndTimeSegments(DEFAULT_TIME_SEGMENT_MAX_VALUES);

        const {validatedTimeString, updatedTimeSelection} = validateTimeString({
            timeString,
            paddedMaxValues,
            offset: validatedValue.length + dateTimeSeparator.length,
            selection: [from, to],
            timeMode,
        });

        if (timeString && !validatedTimeString) {
            return {elementState, data: ''}; // prevent changes
        }

        to = updatedTimeSelection[1];

        validatedValue += hasDateTimeSeparator
            ? dateTimeSeparator + validatedTimeString
            : validatedTimeString;

        const newData = validatedValue.slice(from, to);

        return {
            elementState: {
                selection,
                value:
                    validatedValue.slice(0, from) +
                    newData
                        .split(dateSegmentsSeparator)
                        .map((segment) => '0'.repeat(segment.length))
                        .join(dateSegmentsSeparator) +
                    validatedValue.slice(to),
            },
            data: newData,
        };
    };
}
