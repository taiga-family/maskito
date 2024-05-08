import {TIME_FIXED_CHARACTERS, TIME_SEGMENT_VALUE_LENGTHS} from '../../constants';
import type {MaskitoTimeSegments} from '../../types';
import {escapeRegExp} from '../escape-reg-exp';
import {padWithZeroesUntilValid} from '../pad-with-zeroes-until-valid';
import {parseTimeString} from './parse-time-string';
import {toTimeString} from './to-time-string';

const TRAILING_TIME_SEGMENT_SEPARATOR_REG = new RegExp(
    `[${TIME_FIXED_CHARACTERS.map(escapeRegExp).join('')}]$`,
);

export function validateTimeString({
    timeString,
    paddedMaxValues,
    offset,
    selection: [from, to],
    timeMode,
}: {
    timeString: string;
    paddedMaxValues: MaskitoTimeSegments;
    offset: number;
    selection: readonly [number, number];
    timeMode: string;
}): {validatedTimeString: string; updatedTimeSelection: [number, number]} {
    const parsedTime = parseTimeString(timeString, timeMode);

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

    const [trailingSegmentSeparator = ''] =
        timeString.match(TRAILING_TIME_SEGMENT_SEPARATOR_REG) || [];
    const validatedTimeString =
        toTimeString(validatedTimeSegments) + trailingSegmentSeparator;
    const addedDateSegmentSeparators = Math.max(
        validatedTimeString.length - timeString.length,
        0,
    );

    return {
        validatedTimeString,
        updatedTimeSelection: [
            from + paddedZeroes + addedDateSegmentSeparators,
            to + paddedZeroes + addedDateSegmentSeparators,
        ],
    };
}
