import {MaskitoDateSegments} from '../../../types';

export function segmentsToDate(parsedDate: Partial<MaskitoDateSegments>): Date {
    return new Date(
        Number(parsedDate.year ?? '0'),
        Number(parsedDate.month ?? '0') - 1,
        Number(parsedDate.day ?? '0'),
    );
}
