import type {MaskitoTimeSegments} from '../../types';
import {padTimeSegments} from './pad-time-segments';

export function padStartTimeSegments(
    timeSegments: MaskitoTimeSegments<number | string>,
): MaskitoTimeSegments;

export function padStartTimeSegments(
    timeSegments: Partial<MaskitoTimeSegments<number | string>>,
): Partial<MaskitoTimeSegments>;

export function padStartTimeSegments(
    timeSegments: Partial<MaskitoTimeSegments<number | string>>,
): Partial<MaskitoTimeSegments> {
    return padTimeSegments(timeSegments, (value, length) => value.padStart(length, '0'));
}
