import type {MaskitoPostprocessor} from '@maskito/core';

import type {MaskitoDateSegments} from '../types';
import {
    clamp,
    dateToSegments,
    isDateStringComplete,
    parseDateRangeString,
    parseDateString,
    segmentsToDate,
    toDateString,
} from '../utils';
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

            if (!isDateStringComplete(dateString, dateModeTemplate)) {
                const fixedDate = raiseSegmentValueToMin(parsedDate, dateModeTemplate);
                const fixedValue = toDateString(fixedDate, {dateMode: dateModeTemplate});
                const tail = dateString.endsWith(dateSeparator) ? dateSeparator : '';

                validatedValue += `${fixedValue}${tail}`;
                continue;
            }

            const previousParsedDate = previousDateStrings[index]
                ? parseDateString(previousDateStrings[index], dateModeTemplate)
                : null;

            clampDayToLastDayOfMonth(parsedDate, previousParsedDate);

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

/**
 * When the user changes the month by typing, the day that does not exist
 * in the new month is clamped to the last day of this month
 * (31.01 => type "2" => 28.02) instead of being silently normalized
 * via `new Date` (31.01 => type "2" => 03.03).
 *
 * The month counts as "changed" only if its previous value was a complete
 * valid month (01–12): typing a month from scratch keeps the native
 * `Date` normalization.
 *
 * https://github.com/taiga-family/maskito/issues/2936
 */
function clampDayToLastDayOfMonth(
    parsedDate: Partial<MaskitoDateSegments>,
    previousParsedDate: Partial<MaskitoDateSegments> | null,
): void {
    const previousMonth = previousParsedDate?.month;

    if (
        !parsedDate.day ||
        !isCompleteMonth(parsedDate.month) ||
        !isCompleteMonth(previousMonth) ||
        Number(previousMonth) === Number(parsedDate.month)
    ) {
        return;
    }

    const year =
        parsedDate.year?.length === 2
            ? `20${parsedDate.year}`
            : (parsedDate.year ?? LEAP_YEAR);

    const lastDay = new Date(Number(year), Number(parsedDate.month), 0).getDate();

    parsedDate.day =
        Number(parsedDate.day) > lastDay
            ? String(lastDay).padStart(parsedDate.day.length, '0')
            : parsedDate.day;
}

function isCompleteMonth(month?: string): boolean {
    return month?.length === 2 && Number(month) >= 1 && Number(month) <= 12;
}
