import type {MaskitoDateSegments, MaskitoTimeSegments} from '../../types';
import {dateToSegments} from './date-to-segments';

export function strictDateTimeModeValidation({
    date,
    strict,
    dateSegments,
    timeSegments = {},
    isDateComplete = true,
}: {
    date: Date;
    strict: boolean;
    dateSegments: Partial<MaskitoDateSegments>;
    timeSegments?: Partial<MaskitoTimeSegments>;
    isDateComplete?: boolean;
}): Partial<MaskitoDateSegments & MaskitoTimeSegments> {
    return strict && isDateComplete
        ? dateToSegments(date)
        : {...dateSegments, ...timeSegments};
}
