import type {MaskitoDateMode} from '../../types';

export interface MaskitoDateParams {
    mode: MaskitoDateMode;
    separator?: string;
    max?: Date;
    min?: Date;
}
