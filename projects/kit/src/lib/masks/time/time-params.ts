import type {MaskitoTimeMode, MaskitoTimeSegments} from '../../types';

type IntlPart<K extends keyof Intl.DateTimeFormatPartTypesRegistry, V> = Readonly<
    Partial<Record<K, V>>
>;

export interface MaskitoTimeParams extends IntlPart<
    'dayPeriod',
    readonly [string, string]
> {
    readonly mode: MaskitoTimeMode;
    readonly separators?: readonly string[];
    readonly timeSegmentMaxValues?: Partial<MaskitoTimeSegments<number>>;
    readonly timeSegmentMinValues?: Partial<MaskitoTimeSegments<number>>;
    readonly step?: number;
    readonly prefix?: string;
    readonly postfix?: string;
}
