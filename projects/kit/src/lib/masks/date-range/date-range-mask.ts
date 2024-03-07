import type {MaskitoOptions} from '@maskito/core';
import {MASKITO_DEFAULT_OPTIONS} from '@maskito/core';

import {CHAR_EN_DASH, CHAR_NO_BREAK_SPACE} from '../../constants';
import {
    createDateSegmentsZeroPaddingPostprocessor,
    createFirstDateEndSeparatorPreprocessor,
    createFullWidthToHalfWidthPreprocessor,
    createMinMaxDatePostprocessor,
    createValidDatePreprocessor,
    createZeroPlaceholdersPreprocessor,
    normalizeDatePreprocessor,
} from '../../processors';
import type {MaskitoDateMode, MaskitoDateSegments} from '../../types';
import {parseDateRangeString} from '../../utils';
import {POSSIBLE_DATE_RANGE_SEPARATOR} from './constants';
import {createMinMaxRangeLengthPostprocessor} from './processors/min-max-range-length-postprocessor';
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
            createFullWidthToHalfWidthPreprocessor(),
            createFirstDateEndSeparatorPreprocessor({
                dateModeTemplate,
                dateSegmentSeparator: dateSeparator,
                firstDateEndSeparator: rangeSeparator,
                pseudoFirstDateEndSeparators: POSSIBLE_DATE_RANGE_SEPARATOR,
            }),
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
