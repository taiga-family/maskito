import {MaskitoDateSegments} from '../types';

export function parseDateString(
    dateString: string,
    fullMode: string,
): Partial<MaskitoDateSegments> {
    const cleanMode = fullMode.replace(/[^DMY]/g, '');
    const onlyDigitsDate = dateString.replace(/\D+/g, '');

    const dayIndex = cleanMode.indexOf('D');
    const monthIndex = cleanMode.indexOf('M');
    const yearIndex = cleanMode.indexOf('Y');

    const dateSegments: MaskitoDateSegments = {
        day: onlyDigitsDate.slice(dayIndex, dayIndex + 2),
        month: onlyDigitsDate.slice(monthIndex, monthIndex + 2),
        year: onlyDigitsDate.slice(yearIndex, yearIndex + 4),
    };

    return Object.fromEntries(
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
