import type {MaskitoTimeMode} from '../../types';

export function resolveSeparators(
    mode: MaskitoTimeMode,
    separators: readonly string[] = [],
): readonly string[] {
    const modeWithoutAA = mode.replace(' AA', '');
    const canonicals: string[] = [];

    for (const char of modeWithoutAA) {
        if (char === ':' || char === '.') {
            canonicals.push(char);
        }
    }

    return canonicals.map((def, i) => separators[i] ?? def);
}
