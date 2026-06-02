import type {MaskitoDateMode} from '../../types';
import type {MaskitoDateParams} from '../date/date-params';
import type {MaskitoTimeParams} from '../time/time-params';

interface BaseDateTimeParams
    extends Pick<MaskitoDateParams, 'max' | 'min'>, Pick<MaskitoTimeParams, 'dayPeriod'> {
    dateSeparator?: MaskitoDateParams['separator'];
    timeMode?: MaskitoTimeParams['mode'];
    timeStep?: MaskitoTimeParams['step'];
    dateTimeSeparator?: string;
}

export type MaskitoDateTimeParams = BaseDateTimeParams &
    (
        | {locale: string; dateMode?: MaskitoDateMode}
        | {locale?: string; dateMode: MaskitoDateMode}
    );
