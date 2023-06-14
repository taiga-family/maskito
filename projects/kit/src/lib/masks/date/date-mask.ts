import {MASKITO_DEFAULT_OPTIONS, MaskitoOptions} from '@maskito/core';

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
}): Required<MaskitoOptions> {
    const dateModeTemplate = mode.split('/').join(separator);

    return {
        ...MASKITO_DEFAULT_OPTIONS,
        mask: Array.from(dateModeTemplate).map(char =>
            char === separator ? char : /\d/,
        ),
        overwriteMode: 'replace',
        preprocessors: [
            createZeroPlaceholdersPreprocessor(),
            createValidDatePreprocessor({
                dateModeTemplate,
                dateSegmentsSeparator: separator,
            }),
        ],
        postprocessors: [
            createMinMaxDatePostprocessor({
                min,
                max,
                dateModeTemplate,
                dateSegmentSeparator: separator,
            }),
        ],
    };
}
