import type {MaskitoDateSegments} from '../../../types';

const formatter = Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
});

export function toDateSegments(date: Date): MaskitoDateSegments {
    return formatter
        .formatToParts(date)
        .reduce(
            (acc, part) => ({...acc, [part.type]: part.value}),
            {} as MaskitoDateSegments,
        );
}
