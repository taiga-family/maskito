import {MaskitoDateSegments} from '../../../types';

export function segmentsToDate(parsedDate: Partial<MaskitoDateSegments>): Date {
    const year = parsedDate.year?.length === 2 ? `20${parsedDate.year}` : parsedDate.year;

    return new Date(
        Number(year ?? '0'),
        Number(parsedDate.month ?? '0') - 1,
        Number(parsedDate.day ?? '0'),
    );
}
