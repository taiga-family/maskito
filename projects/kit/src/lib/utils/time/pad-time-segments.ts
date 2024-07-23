import {TIME_SEGMENT_VALUE_LENGTHS} from '../../constants';
import type {MaskitoTimeSegments} from '../../types';

export function padTimeSegments(
    timeSegments: MaskitoTimeSegments<number | string>,
    pad: (segmentValue: string, segmentLength: number) => string,
): MaskitoTimeSegments;

export function padTimeSegments(
    timeSegments: Partial<MaskitoTimeSegments<number | string>>,
    pad: (segmentValue: string, segmentLength: number) => string,
): Partial<MaskitoTimeSegments>;

export function padTimeSegments(
    timeSegments: Partial<MaskitoTimeSegments<number | string>>,
    pad: (segmentValue: string, segmentLength: number) => string,
): Partial<MaskitoTimeSegments> {
    return Object.fromEntries<string>(
        Object.entries(timeSegments).map(([segmentName, segmentValue]) => [
            segmentName,
            pad(
                String(segmentValue),
                TIME_SEGMENT_VALUE_LENGTHS[segmentName as keyof MaskitoTimeSegments],
            ),
        ]),
    );
}
