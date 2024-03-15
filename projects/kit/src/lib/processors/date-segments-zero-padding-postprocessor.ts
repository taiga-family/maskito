import type {MaskitoPostprocessor} from '@maskito/core';

import {DATE_SEGMENTS_MAX_VALUES} from '../constants';
import type {MaskitoDateSegments} from '../types';
import {padWithZeroesUntilValid, parseDateString, toDateString} from '../utils';

export function createDateSegmentsZeroPaddingPostprocessor({
    dateModeTemplate,
    dateSegmentSeparator,
    splitFn,
    uniteFn,
}: {
    dateModeTemplate: string;
    dateSegmentSeparator: string;
    splitFn: (value: string) => {dateStrings: string[]; restPart?: string};
    uniteFn: (validatedDateStrings: string[], initialValue: string) => string;
}): MaskitoPostprocessor {
    return ({value, selection}) => {
        const [from, to] = selection;
        const {dateStrings, restPart = ''} = splitFn(value);
        const validatedDateStrings: string[] = [];
        let caretShift = 0;

        dateStrings.forEach(dateString => {
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

            validatedDateStrings.push(
                toDateString(validatedDateSegments, {dateMode: dateModeTemplate}),
            );
        });

        const validatedValue =
            uniteFn(validatedDateStrings, value) +
            (dateStrings[dateStrings.length - 1]?.endsWith(dateSegmentSeparator)
                ? dateSegmentSeparator
                : '') +
            restPart;

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
