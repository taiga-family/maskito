import type {MaskitoOptions} from '@maskito/core';
import {MASKITO_DEFAULT_OPTIONS} from '@maskito/core';

import {DEFAULT_TIME_SEGMENT_MAX_VALUES, TIME_FIXED_CHARACTERS} from '../../constants';
import {createTimeSegmentsSteppingPlugin} from '../../plugins';
import {
    createColonConvertPreprocessor,
    createDateSegmentsZeroPaddingPostprocessor,
    createFirstDateEndSeparatorPreprocessor,
    createFullWidthToHalfWidthPreprocessor,
    createZeroPlaceholdersPreprocessor,
    normalizeDatePreprocessor,
} from '../../processors';
import type {MaskitoDateMode, MaskitoTimeMode} from '../../types';
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
    const dateModeTemplate = dateMode.split('/').join(dateSeparator);

    return {
        ...MASKITO_DEFAULT_OPTIONS,
        mask: [
            ...Array.from(dateModeTemplate).map(char =>
                dateSeparator.includes(char) ? char : /\d/,
            ),
            ...dateTimeSeparator.split(''),
            ...Array.from(timeMode).map(char =>
                TIME_FIXED_CHARACTERS.includes(char) ? char : /\d/,
            ),
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
            normalizeDatePreprocessor({
                dateModeTemplate,
                dateSegmentsSeparator: dateSeparator,
                dateTimeSeparator,
            }),
            createValidDateTimePreprocessor({
                dateModeTemplate,
                dateSegmentsSeparator: dateSeparator,
                dateTimeSeparator,
                timeMode,
            }),
        ],
        postprocessors: [
            createDateSegmentsZeroPaddingPostprocessor({
                dateModeTemplate,
                dateSegmentSeparator: dateSeparator,
                splitFn: value => {
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
                fullMode: `${dateModeTemplate}${dateTimeSeparator}${timeMode}`,
                timeSegmentMaxValues: DEFAULT_TIME_SEGMENT_MAX_VALUES,
            }),
        ],
    };
}
