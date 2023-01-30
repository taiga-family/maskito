import {MaskitoDateSegments} from '../types';
import {getDateSegmentValueLength} from './date-segment-value-length';
import {padWithZeroesUntilValid} from './pad-with-zeroes-until-valid';
import {parseDateString} from './parse-date-string';
import {toDateString} from './to-date-string';

const dateMaxValues: MaskitoDateSegments<number> = {
    day: 31,
    month: 12,
    year: 9999,
};

export function validateDateString({
    dateString,
    dateModeTemplate,
    offset,
    selection: [from, to],
}: {
    dateString: string;
    dateModeTemplate: string;
    offset: number;
    selection: [number, number];
}): {validatedDateString: string; updatedSelection: [number, number]} {
    const parsedDate = parseDateString(dateString, dateModeTemplate);
    const dateSegments = Object.entries(parsedDate) as Array<
        [keyof MaskitoDateSegments, string]
    >;
    const validatedDateSegments: Partial<MaskitoDateSegments> = {};

    for (const [segmentName, segmentValue] of dateSegments) {
        const validatedDate = toDateString(validatedDateSegments, dateModeTemplate);
        const maxSegmentValue = dateMaxValues[segmentName];

        const fantomSeparator = validatedDate.length && 1;

        const lastSegmentDigitIndex =
            offset +
            validatedDate.length +
            fantomSeparator +
            getDateSegmentValueLength(dateString)[segmentName];
        const isLastSegmentDigitAdded =
            lastSegmentDigitIndex >= from && lastSegmentDigitIndex <= to;

        if (isLastSegmentDigitAdded && Number(segmentValue) > Number(maxSegmentValue)) {
            // 3|1.10.2010 => Type 9 => 3|1.10.2010
            return {validatedDateString: '', updatedSelection: [from, to]}; // prevent changes
        }

        const {validatedSegmentValue, prefixedZeroesCount} = padWithZeroesUntilValid(
            segmentValue,
            `${maxSegmentValue}`,
        );

        to += prefixedZeroesCount;

        validatedDateSegments[segmentName] = validatedSegmentValue;
    }

    return {
        validatedDateString: toDateString(validatedDateSegments, dateModeTemplate),
        updatedSelection: [from, to],
    };
}
