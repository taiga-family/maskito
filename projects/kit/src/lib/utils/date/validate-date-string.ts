import {DATE_SEGMENTS_MAX_VALUES} from '../../constants';
import type {MaskitoDateSegments} from '../../types';
import {getDateSegmentValueLength} from './date-segment-value-length';
import {getDateSegmentsOrder} from './get-date-segments-order';
import {parseDateString} from './parse-date-string';
import {toDateString} from './to-date-string';

export function validateDateString({
    dateString,
    dateModeTemplate,
    dateSeparator,
    offset,
    selection: [from, to],
}: {
    dateString: string;
    dateSeparator: string;
    dateModeTemplate: string;
    offset: number;
    selection: [number, number];
}): {validatedDateString: string; updatedSelection: [number, number]} {
    const parsedDate = parseDateString(dateString, dateModeTemplate);

    const dateSegments = Object.entries(parsedDate) as Array<
        [keyof MaskitoDateSegments, string]
    >;

    const segmentsOrder = getDateSegmentsOrder(dateModeTemplate);
    const validatedDateSegments: Partial<MaskitoDateSegments> = {};

    for (let i = 0; i < dateSegments.length; i++) {
        const [segmentName, segmentValue] = dateSegments[i]!;

        const validatedDate = toDateString(validatedDateSegments, {
            dateMode: dateModeTemplate,
        });

        const maxSegmentValue = DATE_SEGMENTS_MAX_VALUES[segmentName];
        const fantomSeparator = validatedDate.length && dateSeparator.length;

        const lastSegmentDigitIndex =
            offset +
            validatedDate.length +
            fantomSeparator +
            getDateSegmentValueLength(dateModeTemplate)[segmentName];

        const isLastSegmentDigitAdded =
            lastSegmentDigitIndex >= from && lastSegmentDigitIndex === to;

        if (isLastSegmentDigitAdded && Number(segmentValue) > Number(maxSegmentValue)) {
            const nextSegment = segmentsOrder[segmentsOrder.indexOf(segmentName) + 1];

            if (!nextSegment || nextSegment === 'year') {
                // 31.1|0.2010 => Type 9 => 31.1|0.2010
                return {validatedDateString: '', updatedSelection: [from, to]}; // prevent changes
            }

            validatedDateSegments[segmentName] = `0${segmentValue.slice(0, -1)}`;
            dateSegments[i + 1] = [
                nextSegment,
                `${segmentValue.slice(-1)}${(dateSegments[i + 1]?.[1] ?? '').slice(1)}`,
            ];
            continue;
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

    const addedDateSeparators = validatedDateString.length - dateString.length;

    return {
        validatedDateString,
        updatedSelection: [from + addedDateSeparators, to + addedDateSeparators],
    };
}
