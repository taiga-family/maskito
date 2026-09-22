import type {MaskitoTimeParams} from '../../masks/time/time-params';

/**
 * Replaces canonical time segment separators of the mode with the custom ones.
 * @example createTimeModeTemplate({mode: 'HH:MM:SS', separators: [' h ', ' min ']}) => 'HH h MM min SS'
 */
export function createTimeModeTemplate({
    mode,
    separators,
}: Pick<Required<MaskitoTimeParams>, 'mode' | 'separators'>): string {
    let separatorIndex = 0;

    return mode.replaceAll(/[:.]/g, (char) => separators[separatorIndex++] ?? char);
}
