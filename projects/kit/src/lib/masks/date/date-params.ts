import type {MaskitoDateMode} from '../../types';

export type MaskitoDateParams =
    | {locale: string; mode?: MaskitoDateMode; separator?: string; max?: Date; min?: Date}
    | {locale?: never; mode: MaskitoDateMode; separator?: string; max?: Date; min?: Date};
