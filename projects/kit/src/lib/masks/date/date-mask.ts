import type {MaskitoOptions} from '@maskito/core';
import {MASKITO_DEFAULT_OPTIONS} from '@maskito/core';

import {
    createDateSegmentsZeroPaddingPostprocessor,
    createFullWidthToHalfWidthPreprocessor,
    createMinMaxDatePostprocessor,
    createValidDatePreprocessor,
    createZeroPlaceholdersPreprocessor,
    normalizeDatePreprocessor,
} from '../../processors';
import type {MaskitoDateParams} from './date-params';

export function maskitoDateOptionsGenerator({
    mode,
    separator = '.',
    max,
    min,
}: MaskitoDateParams): Required<MaskitoOptions> {
    const dateModeTemplate = mode.split('/').join(separator);

    return {
        ...MASKITO_DEFAULT_OPTIONS,
        mask: Array.from(dateModeTemplate).map((char) =>
            separator.includes(char) ? char : /\d/,
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
            createDateSegmentsZeroPaddingPostprocessor({
                dateModeTemplate,
                dateSegmentSeparator: separator,
                splitFn: (value) => ({dateStrings: [value]}),
                uniteFn: ([dateString = '']) => dateString,
            }),
            createMinMaxDatePostprocessor({
                min,
                max,
                dateModeTemplate,
                dateSegmentSeparator: separator,
            }),
        ],
    };
}
