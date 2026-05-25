import type {MaskitoTimeParams} from '../time-params';

const AM = new Date(1970, 0, 1, 1, 45, 30, 123);
const PM = new Date(1970, 0, 1, 13, 45, 30, 123);

export function getLocaleTimeParams(
    locale: string,
): Pick<Required<MaskitoTimeParams>, 'dayPeriod' | 'separators'> {
    const formatter = new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        fractionalSecondDigits: 3,
    });

    const amParts = formatter.formatToParts(AM);
    const pmParts = formatter.formatToParts(PM);

    return {
        dayPeriod: [amParts, pmParts].map(
            (x) => x.find((part) => part.type === 'dayPeriod')?.value ?? '',
        ) as unknown as readonly [string, string],
        separators: amParts
            .slice(
                amParts.findIndex((x) => x.type === 'hour'),
                amParts.findIndex((x) => x.type === 'fractionalSecond'),
            )
            .filter((x) => x.type === 'literal')
            .map((x) => x.value),
    };
}
