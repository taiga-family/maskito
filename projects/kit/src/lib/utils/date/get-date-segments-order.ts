import type {MaskitoDateSegments} from '../../types';

const ALL_POSSIBLE_SEGMENTS: ReadonlyArray<keyof MaskitoDateSegments> = [
    'day',
    'month',
    'year',
];

export function getDateSegmentsOrder(
    template: string,
): ReadonlyArray<keyof MaskitoDateSegments> {
    return [...ALL_POSSIBLE_SEGMENTS].sort((a, b) =>
        template.indexOf(a[0]!) > template.indexOf(b[0]!) ? 1 : -1,
    );
}
