import {MaskitoDateSegments} from '../types';

export function toDateString(
    {day, month, year}: Partial<MaskitoDateSegments<string>>,
    fullMode: string,
): string {
    return fullMode
        .replace(/D+/g, day ?? '')
        .replace(/M+/g, month ?? '')
        .replace(/Y+/g, year ?? '')
        .replace(/^\D+/g, '')
        .replace(/\D+$/g, '');
}
