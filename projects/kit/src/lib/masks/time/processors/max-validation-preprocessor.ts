import type {MaskitoPreprocessor} from '@maskito/core';

import {TIME_FIXED_CHARACTERS} from '../../../constants';
import type {MaskitoTimeMode, MaskitoTimeSegments} from '../../../types';
import {escapeRegExp} from '../../../utils';
import {padStartTimeSegments, validateTimeString} from '../../../utils/time';

export function createMaxValidationPreprocessor(
    timeSegmentMaxValues: MaskitoTimeSegments<number>,
    timeMode: MaskitoTimeMode,
): MaskitoPreprocessor {
    const paddedMaxValues = padStartTimeSegments(timeSegmentMaxValues);
    const invalidCharsRegExp = new RegExp(
        `[^\\d${TIME_FIXED_CHARACTERS.map(escapeRegExp).join('')}]+`,
    );

    return ({elementState, data}, actionType) => {
        if (actionType === 'deleteBackward' || actionType === 'deleteForward') {
            return {elementState, data};
        }

        const {value, selection} = elementState;

        if (actionType === 'validation') {
            const {validatedTimeString, updatedTimeSelection} = validateTimeString({
                timeString: value,
                paddedMaxValues,
                offset: 0,
                selection,
                timeMode,
            });

            return {
                elementState: {
                    value: validatedTimeString,
                    selection: updatedTimeSelection,
                },
                data,
            };
        }

        const newCharacters = data.replace(invalidCharsRegExp, '');
        const [from, rawTo] = selection;
        let to = rawTo + newCharacters.length; // to be conformed with `overwriteMode: replace`
        const newPossibleValue = value.slice(0, from) + newCharacters + value.slice(to);

        const {validatedTimeString, updatedTimeSelection} = validateTimeString({
            timeString: newPossibleValue,
            paddedMaxValues,
            offset: 0,
            selection: [from, to],
            timeMode,
        });

        if (newPossibleValue && !validatedTimeString) {
            return {elementState, data: ''}; // prevent changes
        }

        to = updatedTimeSelection[1];

        const newData = validatedTimeString.slice(from, to);

        return {
            elementState: {
                selection,
                value:
                    validatedTimeString.slice(0, from) +
                    '0'.repeat(newData.length) +
                    validatedTimeString.slice(to),
            },
            data: newData,
        };
    };
}
