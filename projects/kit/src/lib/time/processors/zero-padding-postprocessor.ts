import {MaskitoOptions} from '@maskito/core';
import {MaskitoTimeSegments} from '../types';
import {parseTimeString, toTimeString} from '../utils';

export function createZeroPaddingPostprocessor(
    timeSegmentMaxValues: MaskitoTimeSegments<number>,
): MaskitoOptions['postprocessor'] {
    return elementState => {
        const {value, selection} = elementState;
        const {hours, minutes, seconds, milliseconds} = parseTimeString(value);

        const newTimeString = toTimeString({
            hours: padWithZeroes(hours, `${timeSegmentMaxValues.hours}`.padStart(2, '0')),
            minutes: padWithZeroes(
                minutes,
                `${timeSegmentMaxValues.minutes}`.padStart(2, '0'),
            ),
            seconds: padWithZeroes(
                seconds,
                `${timeSegmentMaxValues.seconds}`.padStart(2, '0'),
            ),
            milliseconds: padWithZeroes(
                milliseconds,
                `${timeSegmentMaxValues.milliseconds}`.padStart(3, '0'),
            ),
        });

        const newCharactersAmount = newTimeString.length - value.length;
        const [from] = selection;

        return {
            value: newTimeString,
            selection: [from + newCharactersAmount, from + newCharactersAmount],
        };
    };
}

function padWithZeroes(timeSegment: string, maxSegmentValue: string): string {
    if (!timeSegment || timeSegment.length >= maxSegmentValue.length) {
        return timeSegment;
    }

    return Number(timeSegment + '0') > Number(maxSegmentValue)
        ? padWithZeroes('0' + timeSegment, maxSegmentValue)
        : timeSegment;
}
