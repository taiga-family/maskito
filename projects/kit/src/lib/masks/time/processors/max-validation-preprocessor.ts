import {MaskitoOptions} from '@maskito/core';

import {padWithZeroesUntilValid} from '../../../utils';
import {TIME_SEGMENT_VALUE_LENGTHS} from '../constants';
import {MaskitoTimeSegments} from '../types';
import {padTimeSegments, parseTimeString, toTimeString} from '../utils';

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
        const possibleTimeSegments = Object.entries(
            parseTimeString(newPossibleValue),
        ) as Array<[keyof MaskitoTimeSegments, string]>;

        const validatedTimeSegments: Partial<MaskitoTimeSegments> = {};

        for (const [segmentName, segmentValue] of possibleTimeSegments) {
            const validatedTime = toTimeString(validatedTimeSegments);
            const maxSegmentValue = paddedMaxValues[segmentName];

            const fantomSeparator = validatedTime.length && 1;

            const lastSegmentDigitIndex =
                validatedTime.length +
                fantomSeparator +
                TIME_SEGMENT_VALUE_LENGTHS[segmentName];
            const isLastSegmentDigitAdded =
                lastSegmentDigitIndex >= from && lastSegmentDigitIndex <= to;

            if (
                isLastSegmentDigitAdded &&
                Number(segmentValue) > Number(maxSegmentValue)
            ) {
                // 2|0:00 => Type 9 => 2|0:00
                return {elementState, data: ''}; // prevent changes
            }

            const {validatedSegmentValue, prefixedZeroesCount} = padWithZeroesUntilValid(
                segmentValue,
                maxSegmentValue,
            );

            to += prefixedZeroesCount;

            validatedTimeSegments[segmentName] = validatedSegmentValue;
        }

        const finalTimeString = toTimeString(validatedTimeSegments);

        to = finalTimeString.length - value.slice(to).length;

        const newData = finalTimeString.slice(from, to);

        return {
            elementState: {
                selection,
                value:
                    finalTimeString.slice(0, from) +
                    '0'.repeat(newData.length) +
                    finalTimeString.slice(to),
            },
            data: newData,
        };
    };
}
