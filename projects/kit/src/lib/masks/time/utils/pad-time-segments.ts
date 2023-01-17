import {TIME_SEGMENT_VALUE_LENGTHS} from '../constants';
import {MaskitoTimeSegments} from '../types';

export function padTimeSegments(
    timeSegments: MaskitoTimeSegments<number | string>,
): MaskitoTimeSegments;

export function padTimeSegments(
    timeSegments: Partial<MaskitoTimeSegments<number | string>>,
): Partial<MaskitoTimeSegments>;

export function padTimeSegments(
    timeSegments: Partial<MaskitoTimeSegments<number | string>>,
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
