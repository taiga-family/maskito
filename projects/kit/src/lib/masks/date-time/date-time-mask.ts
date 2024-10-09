import type {MaskitoOptions} from '@maskito/core';
import {MASKITO_DEFAULT_OPTIONS} from '@maskito/core';

import {
    DEFAULT_TIME_SEGMENT_MAX_VALUES,
    DEFAULT_TIME_SEGMENT_MIN_VALUES,
} from '../../constants';
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
import type {MaskitoDateMode, MaskitoTimeMode, MaskitoTimeSegments} from '../../types';
import {createTimeMaskExpression} from '../../utils/time';
import {DATE_TIME_SEPARATOR} from './constants';
import {createMinMaxDateTimePostprocessor} from './postprocessors';
import {createValidDateTimePreprocessor} from './preprocessors';
import {parseDateTimeString} from './utils';

export function maskitoDateTimeOptionsGenerator({
    dateMode,
    timeMode,
    dateSeparator = '.',
    min,
    max,
    dateTimeSeparator = DATE_TIME_SEPARATOR,
    timeStep = 0,
}: {
    dateMode: MaskitoDateMode;
    timeMode: MaskitoTimeMode;
    dateSeparator?: string;
    max?: Date;
    min?: Date;
    dateTimeSeparator?: string;
    timeStep?: number;
}): Required<MaskitoOptions> {
    const hasMeridiem = timeMode.includes('AA');
    const dateModeTemplate = dateMode.split('/').join(dateSeparator);
    const timeSegmentMaxValues: MaskitoTimeSegments<number> = {
        ...DEFAULT_TIME_SEGMENT_MAX_VALUES,
        ...(hasMeridiem ? {hours: 12} : {}),
    };
    const timeSegmentMinValues: MaskitoTimeSegments<number> = {
        ...DEFAULT_TIME_SEGMENT_MIN_VALUES,
        ...(hasMeridiem ? {hours: 1} : {}),
    };
    const fullMode = `${dateModeTemplate}${dateTimeSeparator}${timeMode}`;

    return {
        ...MASKITO_DEFAULT_OPTIONS,
        mask: [
            ...Array.from(dateModeTemplate).map((char) =>
                dateSeparator.includes(char) ? char : /\d/,
            ),
            ...dateTimeSeparator.split(''),
            ...createTimeMaskExpression(timeMode),
        ],
        overwriteMode: 'replace',
        preprocessors: [
            createFullWidthToHalfWidthPreprocessor(),
            createColonConvertPreprocessor(),
            createFirstDateEndSeparatorPreprocessor({
                dateModeTemplate,
                dateSegmentSeparator: dateSeparator,
                firstDateEndSeparator: dateTimeSeparator,
                pseudoFirstDateEndSeparators: dateTimeSeparator.split(''),
            }),
            createZeroPlaceholdersPreprocessor(),
            createMeridiemPreprocessor(timeMode),
            normalizeDatePreprocessor({
                dateModeTemplate,
                dateSegmentsSeparator: dateSeparator,
                dateTimeSeparator,
            }),
            createInvalidTimeSegmentInsertionPreprocessor({
                timeMode,
                timeSegmentMinValues,
                timeSegmentMaxValues,
                parseValue: (x) => {
                    const [dateString, timeString] = parseDateTimeString(x, {
                        dateModeTemplate,
                        dateTimeSeparator,
                    });

                    return {timeString, restValue: dateString + dateTimeSeparator};
                },
            }),
            createValidDateTimePreprocessor({
                dateModeTemplate,
                dateSegmentsSeparator: dateSeparator,
                dateTimeSeparator,
                timeMode,
                timeSegmentMaxValues,
            }),
        ],
        postprocessors: [
            createMeridiemPostprocessor(timeMode),
            createDateSegmentsZeroPaddingPostprocessor({
                dateModeTemplate,
                dateSegmentSeparator: dateSeparator,
                splitFn: (value) => {
                    const [dateString, timeString] = parseDateTimeString(value, {
                        dateModeTemplate,
                        dateTimeSeparator,
                    });

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
                timeSegmentMaxValues: DEFAULT_TIME_SEGMENT_MAX_VALUES,
            }),
            createMeridiemSteppingPlugin(fullMode.indexOf(' AA')),
        ],
    };
}
