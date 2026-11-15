import type {MaskitoPostprocessor} from '@maskito/core';

import {
    clamp,
    dateToSegments,
    isDateStringComplete,
    parseDateRangeString,
    parseDateString,
    segmentsToDate,
    toDateString,
} from '../utils';
import {clampDayToLastDayOfMonth} from '../utils/date/clamp-day-to-last-day-of-month';
import {raiseSegmentValueToMin} from '../utils/date/raise-segment-value-to-min';

const LEAP_YEAR = '1972';

export function createMinMaxDatePostprocessor({
    dateModeTemplate,
    min,
    max,
    dateSeparator,
    rangeSeparator = '',
}: {
    dateModeTemplate: string;
    min: Date;
    max: Date;
    rangeSeparator?: string;
    dateSeparator: string;
}): MaskitoPostprocessor {
    const modeYearWidth = dateModeTemplate.replaceAll(/[^y]/g, '').length;

    return ({value, selection}, initialElementState) => {
        const endsWithRangeSeparator = rangeSeparator && value.endsWith(rangeSeparator);
        const dateStrings = parseDateRangeString(value, dateModeTemplate, rangeSeparator);
        const previousDateStrings = parseDateRangeString(
            initialElementState.value,
            dateModeTemplate,
            rangeSeparator,
        );

        let validatedValue = '';

        for (const [index, dateString] of dateStrings.entries()) {
            validatedValue += validatedValue ? rangeSeparator : '';

            const parsedDate = parseDateString(dateString, dateModeTemplate);

            const previousParsedDate = previousDateStrings[index]
                ? parseDateString(previousDateStrings[index], dateModeTemplate)
                : null;

            if (!isDateStringComplete(dateString, dateModeTemplate)) {
                clampDayToLastDayOfMonth(parsedDate, previousParsedDate, modeYearWidth);

                const fixedDate = raiseSegmentValueToMin(parsedDate, dateModeTemplate);
                const fixedValue = toDateString(fixedDate, {dateMode: dateModeTemplate});
                const tail = dateString.endsWith(dateSeparator) ? dateSeparator : '';

                validatedValue += `${fixedValue}${tail}`;
                continue;
            }

            clampDayToLastDayOfMonth(parsedDate, previousParsedDate, modeYearWidth);

            const date = segmentsToDate({year: LEAP_YEAR, ...parsedDate});
            const clampedDate = clamp(date, min, max);

            validatedValue += toDateString(dateToSegments(clampedDate), {
                dateMode: dateModeTemplate,
            });
        }

        return {
            selection,
            value: `${validatedValue}${endsWithRangeSeparator ? rangeSeparator : ''}`,
        };
    };
}
