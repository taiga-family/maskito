import {type MaskitoTimeParams} from '@maskito/kit';

import {CHAR_NO_BREAK_SPACE} from '../../constants';

export function createTimeMaskExpression({
    mode,
    separators = [],
}: Required<Pick<MaskitoTimeParams, 'mode' | 'separators'>>): ReadonlyArray<
    RegExp | string
> {
    const modeWithoutAA = mode.replace(' AA', '');
    const colonSegments = modeWithoutAA.split(':');
    let sepIdx = 0;

    const digitParts = colonSegments.flatMap((colonSegment, i) => {
        const dotSegments = colonSegment.split('.');
        const segmentChars = dotSegments.flatMap((sub, j) => {
            const chars: ReadonlyArray<RegExp | string> = Array.from(sub).map(() => /\d/);

            return j < dotSegments.length - 1
                ? [...chars, ...Array.from(separators[sepIdx++] ?? '.')]
                : chars;
        });

        return i < colonSegments.length - 1
            ? [...segmentChars, ...Array.from(separators[sepIdx++] ?? ':')]
            : segmentChars;
    });

    return digitParts.concat(
        mode.includes('AA') ? [CHAR_NO_BREAK_SPACE, /[AP]/i, /M/i] : [],
    );
}
