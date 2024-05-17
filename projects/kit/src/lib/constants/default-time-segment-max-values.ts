import type {MaskitoTimeSegments} from '../types';

export const DEFAULT_TIME_SEGMENT_MAX_VALUES: MaskitoTimeSegments<number> = {
    hours: 23,
    minutes: 59,
    seconds: 59,
    milliseconds: 999,
};
