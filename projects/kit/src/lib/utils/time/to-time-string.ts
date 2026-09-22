import type {MaskitoTimeParams} from '../../masks/time/time-params';
import type {MaskitoTimeSegments} from '../../types';
import {createTimeModeTemplate} from './create-time-mode-template';

export function toTimeString(
    segments: Partial<MaskitoTimeSegments>,
    {mode, separators}: Pick<Required<MaskitoTimeParams>, 'mode' | 'separators'>,
): string {
    return createTimeModeTemplate({mode, separators})
        .replaceAll(/H+/g, segments.hours ?? '')
        .replaceAll('MSS', segments.milliseconds ?? '')
        .replaceAll(/M+/g, segments.minutes ?? '')
        .replaceAll(/S+/g, segments.seconds ?? '')
        .replace(/^\D*/, '')
        .replace(/\D*$/, '');
}
