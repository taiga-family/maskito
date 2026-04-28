import type {MaskitoDateMode, MaskitoDateSegments} from '../../types';

interface BaseDateRangeParams {
    dateSeparator?: string;
    rangeSeparator?: string;
    min?: Date;
    max?: Date;
    minLength?: Partial<MaskitoDateSegments<number>>;
    maxLength?: Partial<MaskitoDateSegments<number>>;
}

export type MaskitoDateRangeParams = BaseDateRangeParams &
    ({locale: string; mode?: MaskitoDateMode} | {locale?: string; mode: MaskitoDateMode});
