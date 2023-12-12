import {MaskitoDateSegments} from '../../types';
import {getDateSegmentValueLength} from './date-segment-value-length';

export function raiseSegmentValueToMin(
    segments: Partial<MaskitoDateSegments>,
    fullMode: string,
): Partial<MaskitoDateSegments> {
    const segmentsLength = getDateSegmentValueLength(fullMode);

    return Object.fromEntries(
        Object.entries<string>(segments).map(([key, value]: [string, string]) => {
            const segmentLength =
                segmentsLength[key as keyof Partial<MaskitoDateSegments>];

            return [
                key,
                value.length === segmentLength && value.match(/^0+$/)
                    ? '1'.padStart(segmentLength, '0')
                    : value,
            ];
        }),
    );
}
