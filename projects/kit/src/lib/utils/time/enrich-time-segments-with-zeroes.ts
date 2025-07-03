import {DEFAULT_TIME_SEGMENT_MAX_VALUES, TIME_FIXED_CHARACTERS} from '../../constants';
import type {MaskitoTimeMode, MaskitoTimeSegments} from '../../types';
import {escapeRegExp} from '../escape-reg-exp';
import {padWithZeroesUntilValid} from '../pad-with-zeroes-until-valid';
import {padStartTimeSegments} from './pad-start-time-segments';
import {parseTimeString} from './parse-time-string';
import {toTimeString} from './to-time-string';

const TRAILING_TIME_SEGMENT_SEPARATOR_REG = new RegExp(
    `[${TIME_FIXED_CHARACTERS.map(escapeRegExp).join('')}]$`,
);

/**
 * Pads invalid time segment with zero to make it valid.
 * @example 00:|00 => Type 9 (too much for the first digit of minutes) => 00:09|
 * @example |19:00 => Type 2 (29 - invalid value for hours) => 2|0:00
 */
export function enrichTimeSegmentsWithZeroes(
    {value, selection}: {value: string; selection: readonly [number, number]},
    {
        mode,
        timeSegmentMaxValues = DEFAULT_TIME_SEGMENT_MAX_VALUES,
    }: {
        mode: MaskitoTimeMode;
        timeSegmentMaxValues?: MaskitoTimeSegments<number>;
    },
): {value: string; selection: readonly [number, number]} {
    const [from, to] = selection;
    const parsedTime = parseTimeString(value, mode);
    const possibleTimeSegments = Object.entries(parsedTime) as Array<
        [keyof MaskitoTimeSegments, string]
    >;

    const paddedMaxValues = padStartTimeSegments(timeSegmentMaxValues);
    const validatedTimeSegments: Partial<MaskitoTimeSegments> = {};
    let paddedZeroes = 0;

    for (const [segmentName, segmentValue] of possibleTimeSegments) {
        const maxSegmentValue = paddedMaxValues[segmentName];

        const {validatedSegmentValue, prefixedZeroesCount} = padWithZeroesUntilValid(
            segmentValue,
            String(maxSegmentValue),
        );

        paddedZeroes += prefixedZeroesCount;

        validatedTimeSegments[segmentName] = validatedSegmentValue;
    }

    const [leadingNonDigitCharacters = ''] = value.match(/^\D+(?=\d)/g) || []; // prefix
    const [trailingNonDigitCharacters = ''] = value.match(/\D+$/g) || []; // trailing segment separators / meridiem characters / postfix
    const validatedTimeString =
        leadingNonDigitCharacters +
        toTimeString(validatedTimeSegments) +
        trailingNonDigitCharacters;
    const addedDateSegmentSeparators = Math.max(
        validatedTimeString.length - value.length - paddedZeroes,
        0,
    );
    let newFrom = from + paddedZeroes + addedDateSegmentSeparators;
    let newTo = to + paddedZeroes + addedDateSegmentSeparators;

    if (
        newFrom === newTo &&
        paddedZeroes &&
        // if next character after cursor is time segment separator
        validatedTimeString.slice(0, newTo + 1).match(TRAILING_TIME_SEGMENT_SEPARATOR_REG)
    ) {
        newFrom++;
        newTo++;
    }

    return {
        value: validatedTimeString,
        selection: [newFrom, newTo],
    };
}
