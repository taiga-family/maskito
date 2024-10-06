import {DATE_SEGMENTS_MAX_VALUES} from '../../constants';
import type {MaskitoDateSegments} from '../../types';
import {getDateSegmentValueLength} from './date-segment-value-length';
import {parseDateString} from './parse-date-string';
import {toDateString} from './to-date-string';

export function validateDateString({
    dateString,
    dateModeTemplate,
    dateSegmentsSeparator,
    offset,
    selection: [from, to],
}: {
    dateString: string;
    dateSegmentsSeparator: string;
    dateModeTemplate: string;
    offset: number;
    selection: [number, number];
}): {validatedDateString: string; updatedSelection: [number, number]} {
    const parsedDate = parseDateString(dateString, dateModeTemplate);
    const dateSegments = Object.entries(parsedDate) as ReadonlyArray<
        [keyof MaskitoDateSegments, string]
    >;
    const validatedDateSegments: Partial<MaskitoDateSegments> = {};

    for (const [segmentName, segmentValue] of dateSegments) {
        const validatedDate = toDateString(validatedDateSegments, {
            dateMode: dateModeTemplate,
        });
        const maxSegmentValue = DATE_SEGMENTS_MAX_VALUES[segmentName];

        const fantomSeparator = validatedDate.length && dateSegmentsSeparator.length;

        const lastSegmentDigitIndex =
            offset +
            validatedDate.length +
            fantomSeparator +
            getDateSegmentValueLength(dateModeTemplate)[segmentName];
        const isLastSegmentDigitAdded =
            lastSegmentDigitIndex >= from && lastSegmentDigitIndex === to;

        if (isLastSegmentDigitAdded && Number(segmentValue) > Number(maxSegmentValue)) {
            // 3|1.10.2010 => Type 9 => 3|1.10.2010
            return {validatedDateString: '', updatedSelection: [from, to]}; // prevent changes
        }

        if (isLastSegmentDigitAdded && Number(segmentValue) < 1) {
            // 31.0|1.2010 => Type 0 => 31.0|1.2010
            return {validatedDateString: '', updatedSelection: [from, to]}; // prevent changes
        }

        validatedDateSegments[segmentName] = segmentValue;
    }

    const validatedDateString = toDateString(validatedDateSegments, {
        dateMode: dateModeTemplate,
    });
    const addedDateSegmentSeparators = validatedDateString.length - dateString.length;

    return {
        validatedDateString,
        updatedSelection: [
            from + addedDateSegmentSeparators,
            to + addedDateSegmentSeparators,
        ],
    };
}
