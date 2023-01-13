import {TIME_SEGMENT_VALUE_LENGTHS} from '../constants';
import {MaskitoTimeSegments} from '../types';

export function padTimeSegments(
    timeSegments: MaskitoTimeSegments<string | number>,
): MaskitoTimeSegments;

export function padTimeSegments(
    timeSegments: Partial<MaskitoTimeSegments<string | number>>,
): Partial<MaskitoTimeSegments>;

export function padTimeSegments(
    timeSegments: Partial<MaskitoTimeSegments<string | number>>,
): Partial<MaskitoTimeSegments> {
    return Object.fromEntries(
        Object.entries(timeSegments).map(([segmentName, segmentValue]) => [
            segmentName,
            `${segmentValue}`.padEnd(
                TIME_SEGMENT_VALUE_LENGTHS[segmentName as keyof MaskitoTimeSegments],
                '0',
            ),
        ]),
    );
}
