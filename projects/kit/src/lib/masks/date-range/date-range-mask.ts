import {MASKITO_DEFAULT_OPTIONS, type MaskitoOptions} from '@maskito/core';

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
import {parseDateRangeString} from '../../utils';
import {withDateDefaults} from '../date/utils/with-date-defaults';
import {POSSIBLE_DATE_RANGE_SEPARATOR} from './constants';
import type {MaskitoDateRangeParams} from './date-range-params';
import {createMinMaxRangeLengthPostprocessor} from './processors/min-max-range-length-postprocessor';
import {createSwapDatesPostprocessor} from './processors/swap-dates-postprocessor';

export function maskitoDateRange(
    params: MaskitoDateRangeParams,
): Required<MaskitoOptions> {
    const {
        mode,
        separator: dateSeparator,
        min,
        max,
    } = withDateDefaults({
        ...params,
        separator: params.dateSeparator,
    });

    const rangeSeparator =
        params.rangeSeparator ??
        `${CHAR_NO_BREAK_SPACE}${CHAR_EN_DASH}${CHAR_NO_BREAK_SPACE}`;

    const dateModeTemplate = mode.split('/').join(dateSeparator);

    const dateMask = Array.from(dateModeTemplate).map((char) =>
        dateSeparator.includes(char) ? char : /\d/,
    );

    return {
        ...MASKITO_DEFAULT_OPTIONS,
        mask: [...dateMask, ...Array.from(rangeSeparator), ...dateMask],
        overwriteMode: 'replace',
        preprocessors: [
            createFullWidthToHalfWidthPreprocessor(),
            createFirstDateEndSeparatorPreprocessor({
                dateModeTemplate,
                dateSeparator,
                firstDateEndSeparator: rangeSeparator,
                pseudoFirstDateEndSeparators: POSSIBLE_DATE_RANGE_SEPARATOR,
            }),
            createZeroPlaceholdersPreprocessor(),
            normalizeDatePreprocessor({
                dateModeTemplate,
                rangeSeparator,
                dateSeparator,
            }),
            createValidDatePreprocessor({
                dateModeTemplate,
                rangeSeparator,
                dateSeparator,
            }),
        ],
        postprocessors: [
            createDateSegmentsZeroPaddingPostprocessor({
                dateModeTemplate,
                dateSeparator,
                splitFn: (value) => ({
                    dateStrings: parseDateRangeString(
                        value,
                        dateModeTemplate,
                        rangeSeparator,
                    ),
                }),
                uniteFn: (validatedDateStrings, initialValue) =>
                    validatedDateStrings.reduce(
                        (acc, dateString, dateIndex) =>
                            `${acc}${dateString}${
                                !dateIndex && initialValue.includes(rangeSeparator)
                                    ? rangeSeparator
                                    : ''
                            }`,
                        '',
                    ),
            }),
            createMinMaxDatePostprocessor({
                min,
                max,
                dateModeTemplate,
                rangeSeparator,
                dateSeparator,
            }),
            createMinMaxRangeLengthPostprocessor({
                ...params,
                max,
                dateModeTemplate,
                rangeSeparator,
            }),
            createSwapDatesPostprocessor({
                dateModeTemplate,
                rangeSeparator,
            }),
        ],
    };
}

export {
    /**
     * @deprecated Use {@link maskitoDateRange} instead.
     */
    maskitoDateRange as maskitoDateRangeOptionsGenerator,
};
