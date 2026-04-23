import type {MaskitoDateMode} from '../types';

interface LocaleDateInfo {
    mode: MaskitoDateMode;
    separator: string;
}

export function getLocaleDateInfo(locale: string): LocaleDateInfo {
    const parts = new Intl.DateTimeFormat(locale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).formatToParts(new Date(2000, 11, 25));

    const separator = parts.find((part) => part.type === 'literal')?.value ?? '/';
    const first = parts.find(
        (part) => part.type === 'day' || part.type === 'month' || part.type === 'year',
    );

    let mode: MaskitoDateMode;

    if (first?.type === 'month') {
        mode = 'mm/dd/yyyy';
    } else if (first?.type === 'year') {
        mode = 'yyyy/mm/dd';
    } else {
        mode = 'dd/mm/yyyy';
    }

    return {mode, separator};
}
