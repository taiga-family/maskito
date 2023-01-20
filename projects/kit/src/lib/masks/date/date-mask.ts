import {MaskitoOptions, maskitoPipe} from '@maskito/core';

import {createZeroPlaceholdersPreprocessor} from '../../processors';
import {DATE_SEGMENT_VALUE_LENGTH} from './constants';
import {
    createMaxValidationPreprocessor,
    createMinMaxValuePostprocessor,
} from './processors';
import {MaskitoDateMode} from './types';

const RepeatDataChars: Record<string, number> = {
    D: DATE_SEGMENT_VALUE_LENGTH.day,
    M: DATE_SEGMENT_VALUE_LENGTH.month,
    Y: DATE_SEGMENT_VALUE_LENGTH.year,
};

export function maskitoDateOptionsGenerator({
    mode,
    separator = '.',
    max,
    min,
}: {
    mode: MaskitoDateMode;
    separator?: string;
    max?: Date;
    min?: Date;
}): MaskitoOptions {
    const fullDateMode = Array.from(mode)
        .join(separator)
        .split('')
        .map(char => char.repeat(RepeatDataChars[char] || 1))
        .join('');

    return {
        mask: Array.from(fullDateMode).map(char => (char === separator ? char : /\d/)),
        overwriteMode: 'replace',
        preprocessor: maskitoPipe(
            createZeroPlaceholdersPreprocessor(),
            createMaxValidationPreprocessor(fullDateMode, separator),
        ),
        postprocessor: maskitoPipe(
            createMinMaxValuePostprocessor({min, max}, fullDateMode),
        ),
    };
}
