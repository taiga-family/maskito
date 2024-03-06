import type {MaskitoDateSegments} from '../../types';

export function parseDateString(
    dateString: string,
    fullMode: string,
): Partial<MaskitoDateSegments> {
    const cleanMode = fullMode.replaceAll(/[^dmy]/g, '');
    const onlyDigitsDate = dateString.replaceAll(/\D+/g, '');

    const dateSegments: MaskitoDateSegments = {
        day: onlyDigitsDate.slice(cleanMode.indexOf('d'), cleanMode.lastIndexOf('d') + 1),
        month: onlyDigitsDate.slice(
            cleanMode.indexOf('m'),
            cleanMode.lastIndexOf('m') + 1,
        ),
        year: onlyDigitsDate.slice(
            cleanMode.indexOf('y'),
            cleanMode.lastIndexOf('y') + 1,
        ),
    };

    return Object.fromEntries(
        Object.entries(dateSegments)
            .filter(([_, value]) => Boolean(value))
            .sort(([a], [b]) =>
                fullMode.toLowerCase().indexOf(a[0]) >
                fullMode.toLowerCase().indexOf(b[0])
                    ? 1
                    : -1,
            ),
    );
}
