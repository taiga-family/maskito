import {DEFAULT_TIME_SEGMENT_MAX_VALUES} from '../../constants';
import type {MaskitoTimeMode, MaskitoTimeSegments} from '../../types';
import {escapeRegExp} from '../escape-reg-exp';
import {padWithZeroesUntilValid} from '../pad-with-zeroes-until-valid';
import {padStartTimeSegments} from './pad-start-time-segments';
import {parseTimeString} from './parse-time-string';
import {toTimeString} from './to-time-string';

const ALL_SEGMENT_NAMES = new Set(['HH', 'MM', 'MSS', 'SS']);

function toFullSlotSeparators(
    mode: MaskitoTimeMode,
    separators: readonly string[],
): readonly [string, string, string] {
    const modeSegments = mode.split(/\W/).filter((s) => ALL_SEGMENT_NAMES.has(s));
    const hasHH = modeSegments.includes('HH');
    const hasMM = modeSegments.includes('MM');
    const hasSS = modeSegments.includes('SS');
    const hasMSS = modeSegments.includes('MSS');

    let sepIdx = 0;

    return [
        hasHH && hasMM ? (separators[sepIdx++] ?? ':') : '',
        hasMM && hasSS ? (separators[sepIdx++] ?? ':') : '',
        hasSS && hasMSS ? (separators[sepIdx++] ?? '.') : '',
    ] as const;
}

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
    }: {
        mode: MaskitoTimeMode;
        timeSegmentMaxValues?: MaskitoTimeSegments<number>;
        separators?: readonly string[];
    },
): {value: string; selection: readonly [number, number]} {
    const uniqueSeparatorChars = [
        ...new Set(separators.flatMap((sep) => Array.from(sep))),
    ].map(escapeRegExp);

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
    const fullSlotSeps = toFullSlotSeparators(mode, separators);
    const validatedTimeString = `${leadingNonDigitCharacters}${toTimeString(validatedTimeSegments, fullSlotSeps)}${trailingNonDigitCharacters}`;

    const addedTimeSeparators = Math.max(
        validatedTimeString.length - value.length - paddedZeroes,
        0,
    );

    let newFrom = from + paddedZeroes + addedTimeSeparators;
    let newTo = to + paddedZeroes + addedTimeSeparators;

    if (newFrom === newTo && paddedZeroes && uniqueSeparatorChars.length > 0) {
        const trailingTimeSegmentSeparatorReg = new RegExp(
            `[${uniqueSeparatorChars.join('')}]$`,
        );

        const cursorIsRightBeforeSeparator = validatedTimeString
            .slice(0, newTo + 1)
            .match(trailingTimeSegmentSeparatorReg);

        if (cursorIsRightBeforeSeparator) {
            newFrom++;
            newTo++;
        }
    }

    return {
        value: validatedTimeString,
        selection: [newFrom, newTo],
    };
}
