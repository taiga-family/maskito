import {MaskitoDateSegments} from '../types';

export function dateToSegments(date: Date): MaskitoDateSegments {
    return {
        day: String(date.getDate()).padStart(2, '0'),
        month: String(date.getMonth() + 1).padStart(2, '0'),
        year: String(date.getFullYear()).padStart(4, '0'),
    };
}
