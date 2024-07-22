import type {MaskitoTimeSegments} from '../../types';
import {padTimeSegments} from './pad-time-segments';

export function padEndTimeSegments(
    timeSegments: MaskitoTimeSegments<number | string>,
): MaskitoTimeSegments;

export function padEndTimeSegments(
    timeSegments: Partial<MaskitoTimeSegments<number | string>>,
): Partial<MaskitoTimeSegments>;

export function padEndTimeSegments(
    timeSegments: Partial<MaskitoTimeSegments<number | string>>,
): Partial<MaskitoTimeSegments> {
    return padTimeSegments(timeSegments, (value, length) => value.padEnd(length, '0'));
}
