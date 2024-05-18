import type {MaskitoTimeMode, MaskitoTimeSegments} from '../../types';

/**
 * @param timeString can be with/without fixed characters
 */
export function parseTimeString(
    timeString: string,
    timeMode: MaskitoTimeMode,
): Partial<MaskitoTimeSegments> {
    const onlyDigits = timeString.replaceAll(/\D+/g, '');

    const sliceIndexes = createSliceIndexes(timeMode);

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

function createSliceIndexes(timeMode: string): MaskitoTimeSegments<[number, number]> {
    const offset =
        Number(timeMode.startsWith('MM')) * 2 +
        Number(timeMode.startsWith('SS')) * 4 +
        Number(timeMode.startsWith('MSS')) * 6;

    const changeSelection = (index: number): number => Math.max(index - offset, 0);

    return {
        hours: [changeSelection(0), changeSelection(2)],
        minutes: [changeSelection(2), changeSelection(4)],
        seconds: [changeSelection(4), changeSelection(6)],
        milliseconds: [changeSelection(6), changeSelection(9)],
    };
}
