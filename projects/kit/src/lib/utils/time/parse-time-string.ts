import type {MaskitoTimeSegments} from '../../types';

/**
 * @param timeString can be with/without fixed characters
 */
export function parseTimeString(
    timeString: string,
    timeMode: string,
): Partial<MaskitoTimeSegments> {
    const onlyDigits = timeString.replaceAll(/\D+/g, '');

    const sliceIndexes = createSliceIndexes({
        isStartsWithMilliseconds: timeMode.startsWith('MSS'),
        isStartsWithMinutes: timeMode.startsWith('MM'),
        isStartsWithSeconds: timeMode.startsWith('SS'),
    });

    const timeSegments = {
        hours: onlyDigits.slice(...sliceIndexes.hours),
        minutes: onlyDigits.slice(...sliceIndexes.minutes),
        seconds: onlyDigits.slice(...sliceIndexes.seconds),
        milliseconds: onlyDigits.slice(...sliceIndexes.milliseconds),
    };

    return Object.fromEntries(
        Object.entries(timeSegments).filter(([_, value]) => Boolean(value)),
    );
}

function createSliceIndexes({
    isStartsWithMinutes,
    isStartsWithSeconds,
    isStartsWithMilliseconds,
}: {
    isStartsWithMinutes: boolean;
    isStartsWithSeconds: boolean;
    isStartsWithMilliseconds: boolean;
}): MaskitoTimeSegments<[number, number]> {
    const offset =
        Number(isStartsWithMinutes) * 2 +
        Number(isStartsWithSeconds) * 4 +
        Number(isStartsWithMilliseconds) * 6;

    const changeSelection = (index: number): number => Math.max(index - offset, 0);

    return {
        hours: [changeSelection(0), changeSelection(2)],
        minutes: [changeSelection(2), changeSelection(4)],
        seconds: [changeSelection(4), changeSelection(6)],
        milliseconds: [changeSelection(6), changeSelection(9)],
    };
}
