import type {MaskitoDateMode, MaskitoTimeMode} from '../../types';
import type {MaskitoTimeParams} from '../time/time-params';

export interface MaskitoDateTimeParams extends Pick<MaskitoTimeParams, 'dayPeriod'> {
    dateMode: MaskitoDateMode;
    timeMode: MaskitoTimeMode;
    dateSeparator?: string;
    max?: Date;
    min?: Date;
    dateTimeSeparator?: string;
    timeStep?: MaskitoTimeParams['step'];
}
