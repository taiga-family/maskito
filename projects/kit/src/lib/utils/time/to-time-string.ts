import type {MaskitoTimeParams} from '../../masks/time/time-params';
import type {MaskitoTimeSegments} from '../../types';

export function toTimeString(
    segments: Partial<MaskitoTimeSegments>,
    {mode, separators}: Pick<Required<MaskitoTimeParams>, 'mode' | 'separators'>,
): string {
    let separatorIndex = 0;

    const modeTemplate = mode
        .replace(' AA', '')
        .replaceAll(/[:.]/g, () => separators[separatorIndex++]!);

    return modeTemplate
        .replaceAll(/H+/g, segments.hours ?? '')
        .replaceAll('MSS', segments.milliseconds ?? '')
        .replaceAll(/M+/g, segments.minutes ?? '')
        .replaceAll(/S+/g, segments.seconds ?? '')
        .replace(/^\D*/, '')
        .replace(/\D*$/, '');
}
