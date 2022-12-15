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
            const isLastTimeSegmentDigit = isAllTimeSegmentFinished(
                newValidatedLeadingPart,
            );
            const timeSegments = Object.entries(
                parseTimeString(newValidatedLeadingPart),
            ) as Array<[keyof MaskitoTimeSegments, string]>;
            const lastSegmentIndex = timeSegments.length - 1;
            const [segmentName] = timeSegments[lastSegmentIndex];
            const segmentValue = possibleTimeSegments[segmentName] || '';
            const maxSegmentValue = paddedMaxValues[segmentName];

            if (
                isLastTimeSegmentDigit &&
                Number(segmentValue) > Number(maxSegmentValue)
            ) {
                return {elementState, data: ''}; // prevent
            }

            const {validatedTimeSegmentValue, prefixedZeroes} = padZeroesUntilValid(
                segmentValue,
                maxSegmentValue,
            );

            newData += typedCharacter.padStart(prefixedZeroes + 1, '0');

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

function isAllTimeSegmentFinished(value: string): boolean {
    const timeSegments = Object.entries(parseTimeString(value)) as Array<
        [keyof MaskitoTimeSegments, string]
    >;

    return timeSegments.every(
        ([segmentName, segmentValue]) =>
            segmentValue.length >= TIME_SEGMENT_VALUE_LENGTHS[segmentName],
    );
}

function padZeroesUntilValid(
    value: string,
    paddedMaxValue: string,
    prefixedZeroes = 0,
): {validatedTimeSegmentValue: string; prefixedZeroes: number} {
    const paddedValue = value.padEnd(paddedMaxValue.length, '0');

    if (Number(paddedValue) <= Number(paddedMaxValue)) {
        return {validatedTimeSegmentValue: value, prefixedZeroes};
    }

    const canAddZeroPrefix = value.endsWith('0');

    return padZeroesUntilValid(
        canAddZeroPrefix
            ? '0' + value.slice(0, paddedMaxValue.length - 1)
            : value.slice(0, paddedMaxValue.length - 1) + '0',
        paddedMaxValue,
        canAddZeroPrefix ? prefixedZeroes + 1 : prefixedZeroes,
    );
}
