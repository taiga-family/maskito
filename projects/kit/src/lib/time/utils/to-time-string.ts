import {MaskitoTimeSegments} from '../types';

export function toTimeString({
    hours,
    minutes,
    seconds,
    milliseconds,
}: MaskitoTimeSegments): string {
    const mm = minutes && `:${minutes}`;
    const ss = seconds && `:${seconds}`;
    const ms = milliseconds && `.${milliseconds}`;

    return `${hours}${mm}${ss}${ms}`;
}
