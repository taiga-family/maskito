import type {MaskitoDateMode, MaskitoTimeMode} from '../../types';

export interface MaskitoDateTimeParams {
    dateMode: MaskitoDateMode;
    timeMode: MaskitoTimeMode;
    dateSeparator?: string;
    max?: Date;
    min?: Date;
    dateTimeSeparator?: string;
    timeStep?: number;
}
