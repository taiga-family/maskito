import {MASKITO_DEFAULT_OPTIONS, type MaskitoOptions} from '@maskito/core';

import {
    createMeridiemSteppingPlugin,
    createTimeSegmentsSteppingPlugin,
} from '../../plugins';
import {
    createColonConvertPreprocessor,
    createDateSegmentsZeroPaddingPostprocessor,
    createFirstDateEndSeparatorPreprocessor,
    createFullWidthToHalfWidthPreprocessor,
    createInvalidTimeSegmentInsertionPreprocessor,
    createMeridiemPostprocessor,
    createMeridiemPreprocessor,
    createZeroPlaceholdersPreprocessor,
    normalizeDatePreprocessor,
} from '../../processors';
import {createTimeMaskExpression, hasDayPeriod} from '../../utils/time';
import {withDateDefaults} from '../date/utils/with-date-defaults';
import {withTimeDefaults} from '../time/utils/with-time-defaults';
import {DATE_TIME_SEPARATOR} from './constants';
import type {MaskitoDateTimeParams} from './date-time-params';
import {createMinMaxDateTimePostprocessor} from './postprocessors';
import {createValidDateTimePreprocessor} from './preprocessors';
import {splitDateTimeString} from './utils';

export function maskitoDateTime({
    locale,
    dateMode,
    dateSeparator,
    timeMode = 'HH:MM',
    dateTimeSeparator = DATE_TIME_SEPARATOR,
    ...params
}: MaskitoDateTimeParams): Required<MaskitoOptions> {
    const dateParams = withDateDefaults(
        locale
            ? {...params, locale, mode: dateMode, separator: dateSeparator}
            : {...params, mode: dateMode!, separator: dateSeparator},
    );

    const timeParams = withTimeDefaults({...params, locale, mode: timeMode});
    const dateModeTemplate = dateParams.mode.split('/').join(dateParams.separator);
    const fullMode = `${dateModeTemplate}${dateTimeSeparator}${timeMode}`;

    const mask = [
        ...Array.from(dateModeTemplate).map((char) =>
            dateParams.separator.includes(char) ? char : /\d/,
        ),
        ...dateTimeSeparator.split(''),
        ...createTimeMaskExpression(timeParams),
    ];

    return {
        ...MASKITO_DEFAULT_OPTIONS,
        mask,
        overwriteMode: 'replace',
        preprocessors: [
            createFullWidthToHalfWidthPreprocessor(),
            createColonConvertPreprocessor(),
            createFirstDateEndSeparatorPreprocessor({
                dateModeTemplate,
                dateSeparator: dateParams.separator,
                firstDateEndSeparator: dateTimeSeparator,
                pseudoFirstDateEndSeparators: dateTimeSeparator.split(''),
            }),
            createZeroPlaceholdersPreprocessor(),
            createMeridiemPreprocessor(timeParams.dayPeriod),
            normalizeDatePreprocessor({
                dateModeTemplate,
                dateSeparator: dateParams.separator,
                dateTimeSeparator,
            }),
            createInvalidTimeSegmentInsertionPreprocessor({
                ...timeParams,
                timeMode,
                parseValue: (x) => {
                    const [dateString, timeString] = splitDateTimeString(
                        x,
                        dateModeTemplate,
                    );

                    return {timeString, restValue: `${dateString}${dateTimeSeparator}`};
                },
            }),
            createValidDateTimePreprocessor({
                ...timeParams,
                dateModeTemplate,
                dateSeparator: dateParams.separator,
                dateTimeSeparator,
                timeMode,
                timeSeparators: timeParams.separators,
            }),
        ],
        postprocessors: [
            createMeridiemPostprocessor(timeParams.dayPeriod),
            createDateSegmentsZeroPaddingPostprocessor({
                dateModeTemplate,
                dateSeparator: dateParams.separator,
                splitFn: (value) => {
                    const [dateString, timeString] = splitDateTimeString(
                        value,
                        dateModeTemplate,
                    );

                    return {dateStrings: [dateString], restPart: timeString};
                },
                uniteFn: ([validatedDateString], initialValue) =>
                    validatedDateString +
                    (initialValue.includes(dateTimeSeparator) ? dateTimeSeparator : ''),
            }),
            createMinMaxDateTimePostprocessor({
                ...dateParams,
                dateModeTemplate,
                timeMode,
                dateTimeSeparator,
            }),
        ],
        plugins: [
            createTimeSegmentsSteppingPlugin({...timeParams, fullMode}),
            createMeridiemSteppingPlugin({
                ...timeParams,
                meridiemStartIndex: hasDayPeriod(timeParams.dayPeriod)
                    ? mask.length - timeParams.dayPeriod[0].length
                    : -1,
            }),
        ],
    };
}

export {
    /**
     * @deprecated Use {@link maskitoDateTime} instead.
     */
    maskitoDateTime as maskitoDateTimeOptionsGenerator,
};
