import type {MaskitoTimeMode, MaskitoTimeSegments} from '../../types';

const SEGMENT_FULL_NAME: Record<string, keyof MaskitoTimeSegments> = {
    HH: 'hours',
    MM: 'minutes',
    SS: 'seconds',
    MSS: 'milliseconds',
};

/**
 * @param timeString can be with/without fixed characters
 */
export function parseTimeString(
    timeString: string,
    timeMode: MaskitoTimeMode,
): Partial<MaskitoTimeSegments> {
    const onlyDigits = timeString.replaceAll(/\D+/g, '');

    let offset = 0;

    return Object.fromEntries(
        timeMode.split(/\W/).map((segmentAbbr) => {
            const segmentValue = onlyDigits.slice(offset, offset + segmentAbbr.length);

            offset += segmentAbbr.length;

            return [SEGMENT_FULL_NAME[segmentAbbr], segmentValue];
        }),
    );
}
