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
import {getLocaleDateParams} from '../date/utils/get-locale-date-params';
import {POSSIBLE_DATE_RANGE_SEPARATOR} from './constants';
import type {MaskitoDateRangeParams} from './date-range-params';
import {createMinMaxRangeLengthPostprocessor} from './processors/min-max-range-length-postprocessor';
import {createSwapDatesPostprocessor} from './processors/swap-dates-postprocessor';

export function maskitoDateRange(
    {locale = '', ...params}: MaskitoDateRangeParams = {mode: 'dd/mm/yyyy'},
): Required<MaskitoOptions> {
    const localeParams = locale ? getLocaleDateParams(locale) : null;
    const mode = params.mode ?? localeParams?.mode ?? 'dd/mm/yyyy';
    const dateSeparator = params.dateSeparator ?? localeParams?.separator ?? '.';

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
                ...params,
                dateModeTemplate,
                rangeSeparator,
                dateSeparator,
            }),
            createMinMaxRangeLengthPostprocessor({
                ...params,
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
