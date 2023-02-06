import {MaskitoDateSegments} from '../../types';

export function appendDate(
    initialDate: Date,
    {day, month, year}: Partial<MaskitoDateSegments<number>> = {},
): Date {
    const date = new Date(initialDate);

    if (day) {
        date.setDate(date.getDate() + day);
    }

    if (month) {
        date.setMonth(date.getMonth() + month);
    }

    if (year) {
        date.setFullYear(date.getFullYear() + year);
    }

    return date;
}
