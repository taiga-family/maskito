import type {MaskitoTimeParams} from '@maskito/kit';

import {DEFAULT_TIME_SEGMENT_MAX_VALUES} from '../../constants';
import type {MaskitoTimeSegments} from '../../types';
import {escapeRegExp} from '../escape-reg-exp';
import {padWithZeroesUntilValid} from '../pad-with-zeroes-until-valid';
import {padStartTimeSegments} from './pad-start-time-segments';
import {parseTimeString} from './parse-time-string';
import {toTimeString} from './to-time-string';

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
        separators = [],
    }: Pick<MaskitoTimeParams, 'mode' | 'separators'> & {
        readonly timeSegmentMaxValues?: MaskitoTimeSegments<number>;
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

    const time = toTimeString(validatedTimeSegments, {mode, separators});
    const validatedTime = `${leadingNonDigitCharacters}${time}${trailingNonDigitCharacters}`;

    const innerPart = validatedTime.slice(
        leadingNonDigitCharacters.length,
        validatedTime.length - trailingNonDigitCharacters.length,
    );

    const uniqueSeparatorChars = [
        ...new Set(Array.from(innerPart).filter((char) => !/\d/.test(char))),
    ].map(escapeRegExp);

    const addedTimeSeparators = Math.max(
        validatedTime.length - value.length - paddedZeroes,
        0,
    );

    let newFrom = from + paddedZeroes + addedTimeSeparators;
    let newTo = to + paddedZeroes + addedTimeSeparators;

    const caretWasShiftedByZeroPadding =
        newFrom === newTo && paddedZeroes > 0 && uniqueSeparatorChars.length > 0;

    if (caretWasShiftedByZeroPadding) {
        const trailingTimeSegmentSeparatorReg = new RegExp(
            `[${uniqueSeparatorChars.join('')}]$`,
        );

        const cursorIsRightBeforeSeparator = validatedTime
            .slice(0, newTo + 1)
            .match(trailingTimeSegmentSeparatorReg);

        if (cursorIsRightBeforeSeparator) {
            newFrom++;
            newTo++;
        }
    }

    return {
        value: validatedTime,
        selection: [newFrom, newTo],
    };
}
