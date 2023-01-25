import {MaskitoOptions, maskitoPipe} from '@maskito/core';

import {
    createValidDatePreprocessor,
    createZeroPlaceholdersPreprocessor,
} from '../../processors';
import {MaskitoDateMode} from '../../types';
import {getDateModeTemplate} from '../../utils';
import {createMinMaxValuePostprocessor} from './processors';

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
    const dateModeTemplate = getDateModeTemplate(mode, separator);

    return {
        mask: Array.from(dateModeTemplate).map(char =>
            char === separator ? char : /\d/,
        ),
        overwriteMode: 'replace',
        preprocessor: maskitoPipe(
            createZeroPlaceholdersPreprocessor(),
            createValidDatePreprocessor(dateModeTemplate, separator),
        ),
        postprocessor: createMinMaxValuePostprocessor({min, max}, dateModeTemplate),
    };
}
