import {MaskitoOptions} from '@maskito/core';
import {TIME_SEGMENT_VALUE_LENGTHS} from '../constants';
import {MaskitoTimeSegments} from '../types';
import {padTimeSegments, parseTimeString, toTimeString} from '../utils';

export function createMaxValidationPreprocessor(
    timeSegmentMaxValues: MaskitoTimeSegments<number>,
): NonNullable<MaskitoOptions['preprocessor']> {
    const paddedMaxValues = padTimeSegments(timeSegmentMaxValues);

    return ({elementState, data}) => {
        if (!data) {
            return {elementState, data};
        }

        const {value, selection} = elementState;
        const [from, to] = selection;
        const newPossibleValue =
            value.slice(0, from) +
            data +
            // to be conformed with `overwriteMode: replace`
            value.slice(to + data.length);
        const possibleTimeSegments = parseTimeString(newPossibleValue);

        let validatedLeadingPart = value.slice(0, from);
        let newData = '';

        for (const typedCharacter of data) {
            const newValidatedLeadingPart = validatedLeadingPart + typedCharacter;
            const timeSegments = Object.entries(
                parseTimeString(newValidatedLeadingPart),
            ) as Array<[keyof MaskitoTimeSegments, string]>;
            const lastSegmentIndex = timeSegments.length - 1;

            const [segmentName, typedSegmentValue] = timeSegments[lastSegmentIndex];
            const isLastTimeSegmentDigit =
                typedSegmentValue.length >= TIME_SEGMENT_VALUE_LENGTHS[segmentName];

            const segmentValue = possibleTimeSegments[segmentName] || '';
            const maxSegmentValue = paddedMaxValues[segmentName];

            if (
                isLastTimeSegmentDigit &&
                Number(segmentValue) > Number(maxSegmentValue)
            ) {
                return {elementState, data: ''}; // prevent
            }

            const {validatedTimeSegmentValue, prefixedZeroesCount} = padZeroesUntilValid(
                segmentValue,
                maxSegmentValue,
            );

            newData += typedCharacter.padStart(prefixedZeroesCount + 1, '0');

            validatedLeadingPart = toTimeString(
                Object.fromEntries([
                    ...timeSegments.slice(0, lastSegmentIndex),
                    [segmentName, validatedTimeSegmentValue],
                ]),
            );
        }

        return {
            elementState: {
                selection,
                value:
                    validatedLeadingPart +
                    newPossibleValue.slice(validatedLeadingPart.length),
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
