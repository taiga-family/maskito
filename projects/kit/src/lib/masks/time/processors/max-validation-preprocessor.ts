import {MaskitoOptions} from '@maskito/core';

import {MaskitoTimeSegments} from '../../../types';
import {padTimeSegments, validateTimeString} from '../../../utils/time';

export function createMaxValidationPreprocessor(
    timeSegmentMaxValues: MaskitoTimeSegments<number>,
): NonNullable<MaskitoOptions['preprocessor']> {
    const paddedMaxValues = padTimeSegments(timeSegmentMaxValues);

    return ({elementState, data}) => {
        const newCharacters = data.replace(/\D+/g, '');

        if (!newCharacters) {
            return {elementState, data: ''};
        }

        const {value, selection} = elementState;
        const [from, rawTo] = selection;
        let to = rawTo + newCharacters.length; // to be conformed with `overwriteMode: replace`
        const newPossibleValue = value.slice(0, from) + newCharacters + value.slice(to);

        const {validatedTimeString, updatedTimeSelection} = validateTimeString({
            timeString: newPossibleValue,
            paddedMaxValues,
            offset: 0,
            selection: [from, to],
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
