import {TIME_SEGMENT_VALUE_LENGTHS} from '../../constants';
import {MaskitoTimeSegments} from '../../types';
import {padWithZeroesUntilValid} from '../pad-with-zeroes-until-valid';
import {parseTimeString} from './parse-time-string';
import {toTimeString} from './to-time-string';

export function validateTimeString({
    timeString,
    paddedMaxValues,
    offset,
    selection: [from, to],
}: {
    timeString: string;
    paddedMaxValues: MaskitoTimeSegments<string>;
    offset: number;
    selection: [number, number];
}): {validatedTimeString: string; updatedTimeSelection: [number, number]} {
    const parsedTime = parseTimeString(timeString);

    const possibleTimeSegments = Object.entries(parsedTime) as Array<
        [keyof MaskitoTimeSegments, string]
    >;

    const validatedTimeSegments: Partial<MaskitoTimeSegments> = {};

    let paddedZeroes = 0;

    for (const [segmentName, segmentValue] of possibleTimeSegments) {
        const validatedTime = toTimeString(validatedTimeSegments);
        const maxSegmentValue = paddedMaxValues[segmentName];

        const fantomSeparator = validatedTime.length && 1;

        const lastSegmentDigitIndex =
            offset +
            validatedTime.length +
            fantomSeparator +
            TIME_SEGMENT_VALUE_LENGTHS[segmentName];
        const isLastSegmentDigitAdded =
            lastSegmentDigitIndex >= from && lastSegmentDigitIndex <= to;

        if (isLastSegmentDigitAdded && Number(segmentValue) > Number(maxSegmentValue)) {
            // 2|0:00 => Type 9 => 2|0:00
            return {validatedTimeString: '', updatedTimeSelection: [from, to]}; // prevent changes
        }

        const {validatedSegmentValue, prefixedZeroesCount} = padWithZeroesUntilValid(
            segmentValue,
            `${maxSegmentValue}`,
        );

        paddedZeroes += prefixedZeroesCount;

        validatedTimeSegments[segmentName] = validatedSegmentValue;
    }

    const validatedTimeString = toTimeString(validatedTimeSegments);
    const addedDateSegmentSeparators = validatedTimeString.length - timeString.length;

    return {
        validatedTimeString,
        updatedTimeSelection: [
            from + paddedZeroes + addedDateSegmentSeparators,
            to + paddedZeroes + addedDateSegmentSeparators,
        ],
    };
}
