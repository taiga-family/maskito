import {MaskitoOptions, maskitoPipe} from '@maskito/core';

import {CHAR_EN_DASH, CHAR_NO_BREAK_SPACE} from '../../constants';
import {
    createValidDatePreprocessor,
    createZeroPlaceholdersPreprocessor,
} from '../../processors';
import {MaskitoDateMode} from '../../types';

export function maskitoDateRangeOptionsGenerator({
    mode,
    separator = '.',
}: {
    mode: MaskitoDateMode;
    separator?: string;
}): MaskitoOptions {
    const dateModeTemplate = mode.split('/').join(separator);
    const dateMask = Array.from(dateModeTemplate).map(char =>
        char === separator ? char : /\d/,
    );

    return {
        mask: [
            ...dateMask,
            CHAR_NO_BREAK_SPACE,
            CHAR_EN_DASH,
            CHAR_NO_BREAK_SPACE,
            ...dateMask,
        ],
        overwriteMode: 'replace',
        preprocessor: maskitoPipe(
            createZeroPlaceholdersPreprocessor(),
            createValidDatePreprocessor(dateModeTemplate, separator),
        ),
    };
}
