import {MaskitoOptions, maskitoPipe} from '@maskito/core';

import {
    createMinMaxDatePostprocessor,
    createValidDatePreprocessor,
    createZeroPlaceholdersPreprocessor,
} from '../../processors';
import {MaskitoDateMode} from '../../types';

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
    const dateModeTemplate = mode.split('/').join(separator);

    return {
        mask: Array.from(dateModeTemplate).map(char =>
            char === separator ? char : /\d/,
        ),
        overwriteMode: 'replace',
        preprocessor: maskitoPipe(
            createZeroPlaceholdersPreprocessor(),
            createValidDatePreprocessor({
                dateModeTemplate,
                dateSegmentsSeparator: separator,
            }),
        ),
        postprocessor: createMinMaxDatePostprocessor({
            min,
            max,
            dateModeTemplate,
            dateSegmentSeparator: separator,
        }),
    };
}
