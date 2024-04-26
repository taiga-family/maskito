import {MaskitoDateSegments, MaskitoTimeSegments} from '../../types';
import {dateToSegments} from './date-to-segments';

export function strictDateTimeModeValidation({
    clampedDate,
    min,
    max,
    strict,
    dateSegments,
    timeSegments = {},
    isDateComplete = true,
}: {
    clampedDate: Date;
    min: Date;
    max: Date;
    strict: boolean;
    dateSegments: Partial<MaskitoDateSegments>;
    timeSegments?: Partial<MaskitoTimeSegments>;
    isDateComplete?: boolean;
}): Partial<MaskitoDateSegments & MaskitoTimeSegments> {
    if (strict) {
        return isDateComplete
            ? dateToSegments(clampedDate)
            : {...dateSegments, ...timeSegments};
    }

    if (!isDateComplete) {
        return {...dateSegments, ...timeSegments};
    }

    return clampedDate.getTime() === min.getTime() ||
        clampedDate.getTime() === max.getTime()
        ? dateToSegments(clampedDate)
        : {...dateSegments, ...timeSegments};
}
