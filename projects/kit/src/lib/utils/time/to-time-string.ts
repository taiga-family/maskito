import type {MaskitoTimeSegments} from '../../types';

export function toTimeString({
    hours = '',
    minutes = '',
    seconds = '',
    milliseconds = '',
}: Partial<MaskitoTimeSegments>): string {
    const mm = hours ? minutes && `:${minutes}` : minutes;
    const ss = hours || minutes ? seconds && `:${seconds}` : seconds;
    const ms =
        hours || minutes || seconds ? milliseconds && `.${milliseconds}` : milliseconds;

    return `${hours}${mm}${ss}${ms}`;
}
