import type {MaskitoPreprocessor} from '@maskito/core';
import type {MaskitoTimeMode, MaskitoTimeSegments} from '@maskito/kit';

import {
    DEFAULT_TIME_SEGMENT_MAX_VALUES,
    DEFAULT_TIME_SEGMENT_MIN_VALUES,
    TIME_FIXED_CHARACTERS,
    TIME_SEGMENT_VALUE_LENGTHS,
} from '../constants';
import {clamp, escapeRegExp} from '../utils';
import {parseTimeString} from '../utils/time';

/**
 * Prevent insertion if any time segment will become invalid
 * (and even zero padding won't help with it).
 * @example 2|0:00 => Type 9 => 2|0:00
 */
export function createInvalidTimeSegmentInsertionPreprocessor({
    timeMode,
    timeSegmentMinValues = DEFAULT_TIME_SEGMENT_MIN_VALUES,
    timeSegmentMaxValues = DEFAULT_TIME_SEGMENT_MAX_VALUES,
    parseValue = (x) => ({timeString: x}),
}: {
    timeMode: MaskitoTimeMode;
    timeSegmentMinValues?: MaskitoTimeSegments<number>;
    timeSegmentMaxValues?: MaskitoTimeSegments<number>;
    parseValue?: (value: string) => {timeString: string; restValue?: string};
}): MaskitoPreprocessor {
    const invalidCharsRegExp = new RegExp(
        `[^\\d${TIME_FIXED_CHARACTERS.map(escapeRegExp).join('')}]+`,
    );

    return ({elementState, data}, actionType) => {
        if (actionType !== 'insert') {
            return {elementState, data};
        }

        const {value, selection} = elementState;
        const [from, rawTo] = selection;
        const newCharacters = data.replace(invalidCharsRegExp, '');
        const to = rawTo + newCharacters.length; // to be conformed with `overwriteMode: replace`
        const newPossibleValue = value.slice(0, from) + newCharacters + value.slice(to);
        const {timeString, restValue = ''} = parseValue(newPossibleValue);
        const timeSegments = Object.entries(
            parseTimeString(timeString, timeMode),
        ) as Array<[keyof MaskitoTimeSegments, string]>;

        let offset = restValue.length;

        for (const [segmentName, stringifiedSegmentValue] of timeSegments) {
            const minSegmentValue = timeSegmentMinValues[segmentName];
            const maxSegmentValue = timeSegmentMaxValues[segmentName];
            const segmentValue = Number(stringifiedSegmentValue);

            const lastSegmentDigitIndex =
                offset + TIME_SEGMENT_VALUE_LENGTHS[segmentName];

            if (
                lastSegmentDigitIndex >= from &&
                lastSegmentDigitIndex <= to &&
                segmentValue !== clamp(segmentValue, minSegmentValue, maxSegmentValue)
            ) {
                return {elementState, data: ''}; // prevent insertion
            }

            offset +=
                stringifiedSegmentValue.length +
                // any time segment separator
                1;
        }

        return {elementState, data};
    };
}
