import type {MaskitoTimeSegments} from '../types';

export const DEFAULT_TIME_SEGMENT_MAX_VALUES: MaskitoTimeSegments<number> = {
    hours: 23,
    minutes: 59,
    seconds: 59,
    milliseconds: 999,
};

export const DEFAULT_TIME_SEGMENT_MIN_VALUES: MaskitoTimeSegments<number> = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
};
