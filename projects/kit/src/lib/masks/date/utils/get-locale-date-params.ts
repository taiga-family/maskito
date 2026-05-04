import type {MaskitoDateParams} from '../date-params';

export function getLocaleDateParams(
    locale: string,
): Pick<Required<MaskitoDateParams>, 'mode' | 'separator'> {
    const referenceDate = new Date(1970, 0, 2);

    const parts = new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).formatToParts(referenceDate);

    const separator = parts.find((part) => part.type === 'literal')?.value ?? '.';
    const segmentLabel = {day: 'dd', month: 'mm', year: 'yyyy'} as const;

    const mode = parts
        .filter(
            (part): part is Intl.DateTimeFormatPart & {type: 'day' | 'month' | 'year'} =>
                part.type === 'year' || part.type === 'month' || part.type === 'day',
        )
        .map((part) => segmentLabel[part.type])
        .join('/') as NonNullable<MaskitoDateParams['mode']>;

    return {mode, separator};
}
