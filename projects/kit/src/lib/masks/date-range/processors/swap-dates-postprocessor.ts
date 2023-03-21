import {MaskitoOptions} from '@maskito/core';

import {
    isDateStringComplete,
    parseDateRangeString,
    parseDateString,
    segmentsToDate,
} from '../../../utils';

export function createSwapDatesPostprocessor({
    dateModeTemplate,
    datesSeparator,
}: {
    dateModeTemplate: string;
    datesSeparator: string;
}): NonNullable<MaskitoOptions['postprocessor']> {
    return ({value, selection}) => {
        const dateStrings = parseDateRangeString(value, dateModeTemplate, datesSeparator);
        const isDateRangeComplete =
            dateStrings.length === 2 &&
            dateStrings.every(date => isDateStringComplete(date, dateModeTemplate));

        if (!isDateRangeComplete) {
            return {value, selection};
        }

        const [fromDate, toDate] = dateStrings.map(dateString =>
            segmentsToDate(parseDateString(dateString, dateModeTemplate)),
        );

        return {
            selection,
            value: fromDate > toDate ? dateStrings.reverse().join(datesSeparator) : value,
        };
    };
}
