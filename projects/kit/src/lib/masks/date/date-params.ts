import type {MaskitoDateMode} from '../../types';

interface BaseDateParams {
    separator?: string;
    max?: Date;
    min?: Date;
}

export type MaskitoDateParams = BaseDateParams &
    ({locale: string; mode?: MaskitoDateMode} | {locale?: string; mode: MaskitoDateMode});
