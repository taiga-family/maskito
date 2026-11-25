import type {MaskitoDateSegments} from '../../types';

const LEAP_YEAR = '1972';
const NON_LEAP_YEAR = '1900';

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
 * Until the year segment is fully typed, February is treated as a
 * 28-day month. Modes without a year (dd/mm) use the same leap-year
 * basis as `segmentsToDate`.
 *
 * https://github.com/taiga-family/maskito/issues/2936
 */
export function clampDayToLastDayOfMonth(
    parsedDate: Partial<MaskitoDateSegments>,
    previousParsedDate: Partial<MaskitoDateSegments> | null,
    modeYearWidth: number,
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

    const lastDay = new Date(
        Number(getYearBasis(parsedDate.year, modeYearWidth)),
        Number(parsedDate.month),
        0,
    ).getDate();

    parsedDate.day =
        Number(parsedDate.day) > lastDay
            ? String(lastDay).padStart(parsedDate.day.length, '0')
            : parsedDate.day;
}

function getYearBasis(year: string | undefined, modeYearWidth: number): string {
    if (modeYearWidth === 2 && year?.length === 2) {
        return `20${year}`;
    }

    if (modeYearWidth === 4 && year?.length === 4) {
        return year;
    }

    return modeYearWidth === 0 ? LEAP_YEAR : NON_LEAP_YEAR;
}

function isCompleteMonth(month?: string): boolean {
    return month?.length === 2 && Number(month) >= 1 && Number(month) <= 12;
}
