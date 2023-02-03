import {MaskitoDateSegments} from '../../types';

export function toDateString(
    {day, month, year}: Partial<MaskitoDateSegments<string>>,
    mode: string,
): string {
    const safeYear = mode.match(/y/g)?.length === 2 ? year?.slice(-2) : year;

    return mode
        .replace(/d+/g, day ?? '')
        .replace(/m+/g, month ?? '')
        .replace(/y+/g, safeYear ?? '')
        .replace(/^\D+/g, '')
        .replace(/\D+$/g, '');
}
