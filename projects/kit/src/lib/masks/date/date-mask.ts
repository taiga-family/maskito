import {MASKITO_DEFAULT_OPTIONS, type MaskitoOptions} from '@maskito/core';

import {
    createDateSegmentsZeroPaddingPostprocessor,
    createFullWidthToHalfWidthPreprocessor,
    createMinMaxDatePostprocessor,
    createValidDatePreprocessor,
    createZeroPlaceholdersPreprocessor,
    normalizeDatePreprocessor,
} from '../../processors';
import type {MaskitoDateParams} from './date-params';
import {withDateDefaults} from './utils/with-date-defaults';

export function maskitoDate(params: MaskitoDateParams): Required<MaskitoOptions> {
    const {mode, min, max, separator: dateSeparator} = withDateDefaults(params);
    const dateModeTemplate = mode.split('/').join(dateSeparator);

    return {
        ...MASKITO_DEFAULT_OPTIONS,
        mask: [...dateModeTemplate].map((char) =>
            dateSeparator.includes(char) ? char : /\d/,
        ),
        overwriteMode: 'replace',
        preprocessors: [
            createFullWidthToHalfWidthPreprocessor(),
            createZeroPlaceholdersPreprocessor(),
            normalizeDatePreprocessor({
                dateModeTemplate,
                dateSeparator,
            }),
            createValidDatePreprocessor({
                dateModeTemplate,
                dateSeparator,
            }),
        ],
        postprocessors: [
            createDateSegmentsZeroPaddingPostprocessor({
                dateModeTemplate,
                dateSeparator,
                splitFn: (value) => ({dateStrings: [value]}),
                uniteFn: ([dateString = '']) => dateString,
            }),
            createMinMaxDatePostprocessor({
                min,
                max,
                dateModeTemplate,
                dateSeparator,
            }),
        ],
    };
}

export {
    /**
     * @deprecated Use {@link maskitoDate} instead.
     */
    maskitoDate as maskitoDateOptionsGenerator,
};
