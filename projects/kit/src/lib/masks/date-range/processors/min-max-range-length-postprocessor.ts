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
            dateStrings.some(date => !isDateStringComplete(date, dateModeTemplate))
        ) {
            return {value, selection};
        }

        const [fromDate, toDate] = dateStrings.map(dateString =>
            segmentsToDate(parseDateString(dateString, dateModeTemplate)),
        );

        const minDistantToDate = appendDate(fromDate, {
            ...minLength,
            // 06.02.2023 - 07.02.2023 => {minLength: {day: 3}} => 06.02.2023 - 08.02.2023
            // "from"-day is included in the range
            day: minLength?.day && minLength.day - 1,
        });
        const maxDistantToDate = !isEmpty(maxLength)
            ? appendDate(fromDate, {
                  ...maxLength,
                  day: maxLength?.day && maxLength.day - 1, // "from"-day is included in the range
              })
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
