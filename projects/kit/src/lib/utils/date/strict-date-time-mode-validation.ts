import {MaskitoDateSegments, MaskitoTimeSegments} from '../../types';
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
    if (strict) {
        return isDateComplete ? dateToSegments(date) : {...dateSegments, ...timeSegments};
    }

    return {...dateSegments, ...timeSegments};
}
