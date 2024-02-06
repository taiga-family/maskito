import {MaskitoPostprocessor} from '@maskito/core';

import {DATE_SEGMENTS_MAX_VALUES} from '../constants';
import {MaskitoDateSegments} from '../types';
import {
    padWithZeroesUntilValid,
    parseDateRangeString,
    parseDateString,
    toDateString,
} from '../utils';

export function createDateSegmentsZeroPaddingPostprocessor({
    dateModeTemplate,
    dateSegmentSeparator,
    rangeSeparator = '',
}: {
    dateModeTemplate: string;
    dateSegmentSeparator: string;
    rangeSeparator?: string;
}): MaskitoPostprocessor {
    return ({value, selection}) => {
        const [from, to] = selection;
        const dateStrings = parseDateRangeString(value, dateModeTemplate, rangeSeparator);

        let validatedValue = '';
        let caretShift = 0;

        dateStrings.forEach((dateString, dateIndex) => {
            const parsedDate = parseDateString(dateString, dateModeTemplate);
            const dateSegments = Object.entries(parsedDate) as Array<
                [keyof MaskitoDateSegments, string]
            >;

            const validatedDateSegments = dateSegments.reduce(
                (acc, [segmentName, segmentValue]) => {
                    const {validatedSegmentValue, prefixedZeroesCount} =
                        padWithZeroesUntilValid(
                            segmentValue,
                            `${DATE_SEGMENTS_MAX_VALUES[segmentName]}`,
                        );

                    caretShift += prefixedZeroesCount;

                    return {...acc, [segmentName]: validatedSegmentValue};
                },
                {},
            );

            validatedValue +=
                toDateString(validatedDateSegments, dateModeTemplate) +
                (!dateIndex && value.includes(rangeSeparator) ? rangeSeparator : '') +
                (value.endsWith(dateSegmentSeparator) ? dateSegmentSeparator : '');
        });

        if (caretShift && validatedValue[to + 1] === dateSegmentSeparator) {
            /**
             * If `caretShift` > 0, it means that time segment was padded with zero.
             * It is only possible if any character insertion happens.
             * If caret is before `dateSegmentSeparator` => it should be moved after `dateSegmentSeparator`.
             */
            caretShift++;
        }

        return {
            selection: [from + caretShift, to + caretShift],
            value: validatedValue,
        };
    };
}
