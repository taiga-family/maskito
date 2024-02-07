import {MASKITO_DEFAULT_OPTIONS, MaskitoOptions} from '@maskito/core';

import {CHAR_EN_DASH, CHAR_NO_BREAK_SPACE} from '../../constants';
import {
    createDateSegmentsZeroPaddingPostprocessor,
    createMinMaxDatePostprocessor,
    createValidDatePreprocessor,
    createZeroPlaceholdersPreprocessor,
    normalizeDatePreprocessor,
} from '../../processors';
import {MaskitoDateMode, MaskitoDateSegments} from '../../types';
import {parseDateRangeString} from '../../utils';
import {createMinMaxRangeLengthPostprocessor} from './processors/min-max-range-length-postprocessor';
import {createPseudoRangeSeparatorPreprocessor} from './processors/pseudo-range-separator-preprocessor';
import {createSwapDatesPostprocessor} from './processors/swap-dates-postprocessor';

export function maskitoDateRangeOptionsGenerator({
    mode,
    min,
    max,
    minLength,
    maxLength,
    dateSeparator = '.',
    rangeSeparator = `${CHAR_NO_BREAK_SPACE}${CHAR_EN_DASH}${CHAR_NO_BREAK_SPACE}`,
}: {
    mode: MaskitoDateMode;
    min?: Date;
    max?: Date;
    minLength?: Partial<MaskitoDateSegments<number>>;
    maxLength?: Partial<MaskitoDateSegments<number>>;
    dateSeparator?: string;
    rangeSeparator?: string;
}): Required<MaskitoOptions> {
    const dateModeTemplate = mode.split('/').join(dateSeparator);
    const dateMask = Array.from(dateModeTemplate).map(char =>
        char === dateSeparator ? char : /\d/,
    );

    return {
        ...MASKITO_DEFAULT_OPTIONS,
        mask: [...dateMask, ...Array.from(rangeSeparator), ...dateMask],
        overwriteMode: 'replace',
        preprocessors: [
            createPseudoRangeSeparatorPreprocessor({rangeSeparator, dateSeparator}),
            createZeroPlaceholdersPreprocessor(),
            normalizeDatePreprocessor({
                dateModeTemplate,
                rangeSeparator,
                dateSegmentsSeparator: dateSeparator,
            }),
            createValidDatePreprocessor({
                dateModeTemplate,
                rangeSeparator,
                dateSegmentsSeparator: dateSeparator,
            }),
        ],
        postprocessors: [
            createDateSegmentsZeroPaddingPostprocessor({
                dateModeTemplate,
                dateSegmentSeparator: dateSeparator,
                splitFn: value => ({
                    dateStrings: parseDateRangeString(
                        value,
                        dateModeTemplate,
                        rangeSeparator,
                    ),
                }),
                uniteFn: (validatedDateStrings, initialValue) =>
                    validatedDateStrings.reduce(
                        (acc, dateString, dateIndex) =>
                            acc +
                            dateString +
                            (!dateIndex && initialValue.includes(rangeSeparator)
                                ? rangeSeparator
                                : ''),
                        '',
                    ),
            }),
            createMinMaxDatePostprocessor({
                min,
                max,
                dateModeTemplate,
                rangeSeparator,
                dateSegmentSeparator: dateSeparator,
            }),
            createMinMaxRangeLengthPostprocessor({
                dateModeTemplate,
                minLength,
                maxLength,
                max,
                rangeSeparator,
            }),
            createSwapDatesPostprocessor({
                dateModeTemplate,
                rangeSeparator,
            }),
        ],
    };
}
