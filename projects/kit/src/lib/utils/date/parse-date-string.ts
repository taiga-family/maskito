import {MaskitoDateSegments} from '../../types';
import {getObjectFromEntries} from '../get-object-from-entries';
import {getDateSegmentValueLength} from './date-segment-value-length';

export function parseDateString(
    dateString: string,
    fullMode: string,
): Partial<MaskitoDateSegments> {
    const cleanMode = fullMode.replace(/[^dmy]/g, '');
    const onlyDigitsDate = dateString.replace(/\D+/g, '');

    const dayIndex = cleanMode.indexOf('d');
    const monthIndex = cleanMode.indexOf('m');
    const yearIndex = cleanMode.indexOf('y');

    const dateSegments: MaskitoDateSegments = {
        day: onlyDigitsDate.slice(dayIndex, dayIndex + 2),
        month: onlyDigitsDate.slice(monthIndex, monthIndex + 2),
        year: onlyDigitsDate.slice(yearIndex, cleanMode.lastIndexOf('y') + 1),
    };

    return getObjectFromEntries(
        Object.entries(dateSegments)
            .filter(([_, value]) => Boolean(value))
            .sort(([a], [b]) =>
                fullMode.toLowerCase().indexOf(a[0]) >
                fullMode.toLowerCase().indexOf(b[0])
                    ? 1
                    : -1,
            ),
    );
}

export function normalizeDateSegments(
    {day, month, year}: MaskitoDateSegments,
    fullMode: string,
): MaskitoDateSegments {
    const {
        day: dayLength,
        month: monthLength,
        year: yearLength,
    } = getDateSegmentValueLength(fullMode);

    return {
        day:
            day.length === dayLength && day.match(/^0+$/)
                ? '1'.padStart(dayLength, '0')
                : day,
        month:
            month.length === monthLength && month.match(/^0+$/)
                ? '1'.padStart(monthLength, '0')
                : month,
        year:
            year.length === yearLength && year.match(/^0+$/)
                ? '1'.padStart(yearLength, '0')
                : year,
    };
}
