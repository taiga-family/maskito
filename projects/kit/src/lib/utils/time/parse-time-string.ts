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
    const isAM = timeString.includes('AM');
    const isPM = timeString.includes('PM');

    const onlyDigits = timeString.replaceAll(/\D+/g, '');

    let offset = 0;

    const result = Object.fromEntries(
        timeMode
            .split(/\W/)
            .filter((segmentAbbr) => SEGMENT_FULL_NAME[segmentAbbr])
            .map((segmentAbbr) => {
                const segmentValue = onlyDigits.slice(
                    offset,
                    offset + segmentAbbr.length,
                );

                offset += segmentAbbr.length;

                return [SEGMENT_FULL_NAME[segmentAbbr], segmentValue];
            }),
    );

    const hourNum = Number(result.hours);

    if (Number.isFinite(hourNum)) {
        if (isPM && hourNum < 12) {
            result.hours = String(hourNum + 12);
        }

        if (isAM && hourNum === 12) {
            result.hours = '00';
        }
    }

    return result;
}
