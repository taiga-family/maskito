import {DATE_SEGMENT_VALUE_LENGTH} from '../constants';
import {MaskitoDateMode} from '../types';

const RepeatDataChars: Record<string, number> = {
    D: DATE_SEGMENT_VALUE_LENGTH.day,
    M: DATE_SEGMENT_VALUE_LENGTH.month,
    Y: DATE_SEGMENT_VALUE_LENGTH.year,
};

export function getDateModeTemplate(
    dateMode: MaskitoDateMode,
    separator: string,
): string {
    return Array.from(dateMode)
        .join(separator)
        .split('')
        .map(char => char.repeat(RepeatDataChars[char] || 1))
        .join('');
}
