import {MaskitoOptions} from '@maskito/core';

import {padWithZeroesUntilValid} from '../../../utils';
import {DATE_SEGMENT_VALUE_LENGTH} from '../constants';
import {MaskitoDateSegments} from '../types';
import {parseDateString, toDateString} from '../utils';

const dateMaxValues: MaskitoDateSegments<number> = {
    day: 31,
    month: 12,
    year: 9999,
};

export function createMaxValidationPreprocessor(
    fullMode: string,
    separator: string,
): NonNullable<MaskitoOptions['preprocessor']> {
    return ({elementState, data}) => {
        const newCharacters = data.replace(/\D+/g, '');

        if (!newCharacters) {
            return {elementState, data: ''};
        }

        const {value, selection} = elementState;
        const [from, rawTo] = selection;
        let to = rawTo + data.length;
        const newPossibleValue = value.slice(0, from) + newCharacters + value.slice(to);
        const parsedDate = parseDateString(newPossibleValue, fullMode);

        const possibleDateSegments = Object.entries(parsedDate) as Array<
            [keyof MaskitoDateSegments, string]
        >;
        const validatedDateSegments: Partial<MaskitoDateSegments> = {};

        for (const [segmentName, segmentValue] of possibleDateSegments) {
            const validatedDate = toDateString(validatedDateSegments, fullMode);
            const maxSegmentValue = dateMaxValues[segmentName];

            const fantomSeparator = validatedDate.length && 1;

            const lastSegmentDigitIndex =
                validatedDate.length +
                fantomSeparator +
                DATE_SEGMENT_VALUE_LENGTH[segmentName];
            const isLastSegmentDigitAdded =
                lastSegmentDigitIndex >= from && lastSegmentDigitIndex <= to;

            if (
                isLastSegmentDigitAdded &&
                Number(segmentValue) > Number(maxSegmentValue)
            ) {
                // 3|1.10.2010 => Type 9 => 3|1.10.2010
                return {elementState, data: ''}; // prevent changes
            }

            const {validatedSegmentValue, prefixedZeroesCount} = padWithZeroesUntilValid(
                segmentValue,
                `${maxSegmentValue}`,
            );

            to += prefixedZeroesCount;

            validatedDateSegments[segmentName] = validatedSegmentValue;
        }

        const finalDateString = toDateString(validatedDateSegments, fullMode);

        to = finalDateString.length - value.slice(to).length;

        const newData = finalDateString.slice(from, to);

        return {
            elementState: {
                selection,
                value:
                    finalDateString.slice(0, from) +
                    newData
                        .split(separator)
                        .map(segment => '0'.repeat(segment.length))
                        .join(separator) +
                    finalDateString.slice(to),
            },
            data: newData.replaceAll(separator, ''),
        };
    };
}
