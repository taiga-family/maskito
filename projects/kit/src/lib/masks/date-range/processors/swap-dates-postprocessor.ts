import type {MaskitoPostprocessor} from '@maskito/core';

import {
    isDateStringComplete,
    parseDateRangeString,
    parseDateString,
    segmentsToDate,
} from '../../../utils';

export function createSwapDatesPostprocessor({
    dateModeTemplate,
    rangeSeparator,
}: {
    dateModeTemplate: string;
    rangeSeparator: string;
}): MaskitoPostprocessor {
    return ({value, selection}) => {
        const dateStrings = parseDateRangeString(value, dateModeTemplate, rangeSeparator);
        const isDateRangeComplete =
            dateStrings.length === 2 &&
            dateStrings.every((date) => isDateStringComplete(date, dateModeTemplate));
        const [from, to] = selection;
        const caretAtTheEnd = from >= value.length;
        const allValueSelected = from === 0 && to >= value.length; // dropping text inside with a pointer

        if (!(caretAtTheEnd || allValueSelected) || !isDateRangeComplete) {
            return {value, selection};
        }

        const [fromDate, toDate] = dateStrings.map((dateString) =>
            segmentsToDate(parseDateString(dateString, dateModeTemplate)),
        );

        return {
            selection,
            value:
                fromDate && toDate && fromDate > toDate
                    ? dateStrings.reverse().join(rangeSeparator)
                    : value,
        };
    };
}
