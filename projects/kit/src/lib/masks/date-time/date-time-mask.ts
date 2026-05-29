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
import {withTimeDefaults} from '../time/utils/with-time-defaults';
import {DATE_TIME_SEPARATOR} from './constants';
import type {MaskitoDateTimeParams} from './date-time-params';
import {createMinMaxDateTimePostprocessor} from './postprocessors';
import {createValidDateTimePreprocessor} from './preprocessors';
import {splitDateTimeString} from './utils';

export function maskitoDateTimeOptionsGenerator({
    dateMode,
    timeMode,
    dateSeparator = '.',
    min,
    max,
    dateTimeSeparator = DATE_TIME_SEPARATOR,
    timeStep = 0,
    ...params
}: MaskitoDateTimeParams): Required<MaskitoOptions> {
    const dateModeTemplate = dateMode.split('/').join(dateSeparator);

    const {timeSegmentMaxValues, timeSegmentMinValues, separators, dayPeriod} =
        withTimeDefaults({...params, mode: timeMode});

    const fullMode = `${dateModeTemplate}${dateTimeSeparator}${timeMode}`;

    const mask = [
        ...Array.from(dateModeTemplate).map((char) =>
            dateSeparator.includes(char) ? char : /\d/,
        ),
        ...dateTimeSeparator.split(''),
        ...createTimeMaskExpression({
            mode: timeMode,
            separators,
            dayPeriod,
        }),
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
                dateSeparator,
                firstDateEndSeparator: dateTimeSeparator,
                pseudoFirstDateEndSeparators: dateTimeSeparator.split(''),
            }),
            createZeroPlaceholdersPreprocessor(),
            createMeridiemPreprocessor(dayPeriod),
            normalizeDatePreprocessor({
                dateModeTemplate,
                dateSeparator,
                dateTimeSeparator,
            }),
            createInvalidTimeSegmentInsertionPreprocessor({
                timeMode,
                timeSegmentMinValues,
                timeSegmentMaxValues,
                parseValue: (x) => {
                    const [dateString, timeString] = splitDateTimeString(
                        x,
                        dateModeTemplate,
                    );

                    return {timeString, restValue: `${dateString}${dateTimeSeparator}`};
                },
            }),
            createValidDateTimePreprocessor({
                dateModeTemplate,
                dateSeparator,
                dateTimeSeparator,
                timeMode,
                timeSegmentMaxValues,
                timeSeparators: separators,
            }),
        ],
        postprocessors: [
            createMeridiemPostprocessor(dayPeriod),
            createDateSegmentsZeroPaddingPostprocessor({
                dateModeTemplate,
                dateSeparator,
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
                min,
                max,
                dateModeTemplate,
                timeMode,
                dateTimeSeparator,
            }),
        ],
        plugins: [
            createTimeSegmentsSteppingPlugin({
                step: timeStep,
                fullMode,
                timeSegmentMinValues,
                timeSegmentMaxValues,
            }),
            createMeridiemSteppingPlugin({
                dayPeriod,
                meridiemStartIndex: hasDayPeriod(dayPeriod)
                    ? mask.length - dayPeriod[0].length
                    : -1,
            }),
        ],
    };
}
