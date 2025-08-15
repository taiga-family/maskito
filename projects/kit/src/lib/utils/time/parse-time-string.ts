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

    const hours = Number(result.hours);

    if (timeMode.includes('AA') && Number.isFinite(hours)) {
        result.hours = timeString.includes('PM')
            ? String(hours < 12 ? hours + 12 : hours)
            : result.hours.replace('12', '00');
    }

    return result;
}
