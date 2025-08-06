import type {MaskitoPostprocessor} from '@maskito/core';

import {DEFAULT_MAX_DATE} from '../../../constants';
import type {MaskitoDateSegments} from '../../../types';
import {
    appendDate,
    clamp,
    dateToSegments,
    identity,
    isDateStringComplete,
    isEmpty,
    parseDateRangeString,
    parseDateString,
    segmentsToDate,
    toDateString,
} from '../../../utils';

export function createMinMaxRangeLengthPostprocessor({
    dateModeTemplate,
    rangeSeparator,
    minLength,
    maxLength,
    max = DEFAULT_MAX_DATE,
}: {
    dateModeTemplate: string;
    rangeSeparator: string;
    max?: Date;
    minLength?: Partial<MaskitoDateSegments<number>>;
    maxLength?: Partial<MaskitoDateSegments<number>>;
}): MaskitoPostprocessor {
    if (isEmpty(minLength) && isEmpty(maxLength)) {
        return identity;
    }

    return ({value, selection}) => {
        const dateStrings = parseDateRangeString(value, dateModeTemplate, rangeSeparator);

        if (
            dateStrings.length !== 2 ||
            dateStrings.some((date) => !isDateStringComplete(date, dateModeTemplate))
        ) {
            return {value, selection};
        }

        const [fromDate, toDate] = dateStrings.map((dateString) =>
            segmentsToDate(parseDateString(dateString, dateModeTemplate)),
        );

        if (!fromDate || !toDate) {
            return {value, selection};
        }

        const minDistantToDate = appendDate(fromDate, minLength);
        const maxDistantToDate = !isEmpty(maxLength)
            ? appendDate(fromDate, maxLength)
            : max;

        const minLengthClampedToDate = clamp(toDate, minDistantToDate, max);
        const minMaxLengthClampedToDate =
            minLengthClampedToDate > maxDistantToDate
                ? maxDistantToDate
                : minLengthClampedToDate;

        return {
            selection,
            value:
                dateStrings[0] +
                rangeSeparator +
                toDateString(dateToSegments(minMaxLengthClampedToDate), {
                    dateMode: dateModeTemplate,
                }),
        };
    };
}
