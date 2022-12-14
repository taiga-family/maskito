import {MaskitoOptions} from '@maskito/core';
import {MaskitoTimeSegments} from '../types';
import {parseTimeString} from '../utils';

export function createMaxValidationPreprocessor(
    timeSegmentMaxValues: MaskitoTimeSegments<number>,
): NonNullable<MaskitoOptions['preprocessor']> {
    return ({elementState, data}) => {
        const {value, selection} = elementState;
        const [from, to] = selection;
        const newPossibleValue =
            value.slice(0, from) +
            data +
            // to be conformed with `overwriteMode: replace`
            value.slice(data && to === from && to < value.length ? to + 1 : to);
        const timeParts = parseTimeString(newPossibleValue);

        let validatedStringPart = '';

        for (const [segmentName, segmentValue] of Object.entries(timeParts)) {
            const maxSegmentValue =
                timeSegmentMaxValues[segmentName as keyof MaskitoTimeSegments];

            if (segmentValue > maxSegmentValue) {
                return {elementState: {value: validatedStringPart, selection}, data: ''};
            }

            validatedStringPart += segmentValue;
        }

        return {elementState, data};
    };
}
