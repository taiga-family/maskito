import type {MaskitoDateSegments, MaskitoTimeSegments} from '../../types';

export function dateToSegments(date: Date): MaskitoDateSegments & MaskitoTimeSegments {
    return {
        day: String(date.getDate()).padStart(2, '0'),
        month: String(date.getMonth() + 1).padStart(2, '0'),
        year: String(date.getFullYear()).padStart(4, '0'),
        hours: String(date.getHours()).padStart(2, '0'),
        minutes: String(date.getMinutes()).padStart(2, '0'),
        seconds: String(date.getSeconds()).padStart(2, '0'),
        milliseconds: String(date.getMilliseconds()).padStart(3, '0'),
    };
}
