import {MaskitoDateSegments, MaskitoTimeSegments} from '../../types';

export function segmentsToDate(
    parsedDate: Partial<MaskitoDateSegments>,
    parsedTime?: Partial<MaskitoTimeSegments>,
): Date {
    const year = parsedDate.year?.length === 2 ? `20${parsedDate.year}` : parsedDate.year;

    const date = new Date(
        Number(year ?? '0'),
        Number(parsedDate.month ?? '1') - 1,
        Number(parsedDate.day ?? '1'),
        Number(parsedTime?.hours ?? '0'),
        Number(parsedTime?.minutes ?? '0'),
        Number(parsedTime?.seconds ?? '0'),
        Number(parsedTime?.milliseconds ?? '0'),
    );

    // needed for years less than 1900
    date.setUTCFullYear(Number(year ?? '0'));

    return date;
}
