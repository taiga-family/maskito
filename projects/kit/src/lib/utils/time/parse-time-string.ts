import {MaskitoTimeSegments} from '../../types';

/**
 * @param timeString can be with/without fixed characters
 */
export function parseTimeString(timeString: string): Partial<MaskitoTimeSegments> {
    const onlyDigits = timeString.replaceAll(/\D+/g, '');

    const timeSegments = {
        hours: onlyDigits.slice(0, 2),
        minutes: onlyDigits.slice(2, 4),
        seconds: onlyDigits.slice(4, 6),
        milliseconds: onlyDigits.slice(6, 9),
    };

    return Object.fromEntries(
        Object.entries(timeSegments).filter(([_, value]) => Boolean(value)),
    );
}
