import type {MaskitoOptions} from '@maskito/core';
import {MASKITO_DEFAULT_OPTIONS} from '@maskito/core';

import {
    createDateSegmentsValidationPostprocessor,
    createDateSegmentsZeroPaddingPostprocessor,
    createFullWidthToHalfWidthPreprocessor,
    createMinMaxDatePostprocessor,
    createValidDatePreprocessor,
    createZeroPlaceholdersPreprocessor,
    normalizeDatePreprocessor,
} from '../../processors';
import type {MaskitoDateMode} from '../../types';

export function maskitoDateOptionsGenerator({
    mode,
    separator = '.',
    max,
    min,
    strict = true,
}: {
    mode: MaskitoDateMode;
    separator?: string;
    max?: Date;
    min?: Date;
    strict?: boolean;
}): Required<MaskitoOptions> {
    const dateModeTemplate = mode.split('/').join(separator);

    return {
        ...MASKITO_DEFAULT_OPTIONS,
        mask: Array.from(dateModeTemplate).map(char =>
            char === separator ? char : /\d/,
        ),
        overwriteMode: 'replace',
        preprocessors: [
            createFullWidthToHalfWidthPreprocessor(),
            createZeroPlaceholdersPreprocessor(),
            normalizeDatePreprocessor({
                dateModeTemplate,
                dateSegmentsSeparator: separator,
            }),
            createValidDatePreprocessor({
                dateModeTemplate,
                dateSegmentsSeparator: separator,
            }),
        ],
        postprocessors: [
            createDateSegmentsValidationPostprocessor({
                dateModeTemplate,
                dateSegmentSeparator: separator,
                strict,
            }),
            createDateSegmentsZeroPaddingPostprocessor({
                dateModeTemplate,
                dateSegmentSeparator: separator,
                splitFn: value => ({dateStrings: [value]}),
                uniteFn: ([dateString]) => dateString,
            }),
            createMinMaxDatePostprocessor({
                min,
                max,
                dateModeTemplate,
            }),
        ],
    };
}
