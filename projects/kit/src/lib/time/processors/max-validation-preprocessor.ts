import {MaskitoOptions} from '@maskito/core';
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
                return {elementState, data: ''}; // prevent
            }

            const {validatedTimeSegmentValue, prefixedZeroesCount} = padZeroesUntilValid(
                segmentValue,
                maxSegmentValue,
            );

            to += prefixedZeroesCount;

            validatedTimeSegments[segmentName] = validatedTimeSegmentValue;
        }

        const final = toTimeString(validatedTimeSegments);
        const newData = final.slice(from, to);
        const newValue =
            final.slice(0, from) + '0'.repeat(newData.length) + final.slice(to);

        return {
            elementState: {
                selection,
                value: newValue,
            },
            data: newData,
        };
    };
}

function padZeroesUntilValid(
    value: string,
    paddedMaxValue: string,
    prefixedZeroesCount = 0,
): {validatedTimeSegmentValue: string; prefixedZeroesCount: number} {
    const paddedValue = value.padEnd(paddedMaxValue.length, '0');

    if (Number(paddedValue) <= Number(paddedMaxValue)) {
        return {validatedTimeSegmentValue: value, prefixedZeroesCount};
    }

    const canAddZeroPrefix = value.endsWith('0');

    return padZeroesUntilValid(
        canAddZeroPrefix
            ? '0' + value.slice(0, paddedMaxValue.length - 1)
            : value.slice(0, paddedMaxValue.length - 1) + '0',
        paddedMaxValue,
        canAddZeroPrefix ? prefixedZeroesCount + 1 : prefixedZeroesCount,
    );
}
