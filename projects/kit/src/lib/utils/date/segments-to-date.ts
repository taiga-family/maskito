import type {MaskitoDateSegments, MaskitoTimeSegments} from '../../types';

export function segmentsToDate(
    parsedDate: Partial<MaskitoDateSegments>,
    parsedTime?: Partial<MaskitoTimeSegments>,
): Date {
    const year = parsedDate.year?.length === 2 ? `20${parsedDate.year}` : parsedDate.year;
    const date = new Date(0, 0); // new Date(0, 0).getFullYear() => 1900

    date.setFullYear(
        Number(year ?? '0'),
        Number(parsedDate.month ?? '1') - 1,
        Number(parsedDate.day ?? '1'),
    );
    date.setHours(
        Number(parsedTime?.hours ?? '0'),
        Number(parsedTime?.minutes ?? '0'),
        Number(parsedTime?.seconds ?? '0'),
        Number(parsedTime?.milliseconds ?? '0'),
    );

    return date;
}
