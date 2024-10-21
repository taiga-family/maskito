import type {MaskitoOptions} from '@maskito/core';

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
    createFullWidthToHalfWidthPreprocessor,
    createInvalidTimeSegmentInsertionPreprocessor,
    createMeridiemPostprocessor,
    createMeridiemPreprocessor,
    createZeroPlaceholdersPreprocessor,
} from '../../processors';
import type {MaskitoTimeSegments} from '../../types';
import {createTimeMaskExpression, enrichTimeSegmentsWithZeroes} from '../../utils/time';
import type {MaskitoTimeParams} from './time-params';

export function maskitoTimeOptionsGenerator({
    mode,
    timeSegmentMaxValues = {},
    timeSegmentMinValues = {},
    step = 0,
}: MaskitoTimeParams): Required<MaskitoOptions> {
    const hasMeridiem = mode.includes('AA');
    const enrichedTimeSegmentMaxValues: MaskitoTimeSegments<number> = {
        ...DEFAULT_TIME_SEGMENT_MAX_VALUES,
        ...(hasMeridiem ? {hours: 12} : {}),
        ...timeSegmentMaxValues,
    };
    const enrichedTimeSegmentMinValues: MaskitoTimeSegments<number> = {
        ...DEFAULT_TIME_SEGMENT_MIN_VALUES,
        ...(hasMeridiem ? {hours: 1} : {}),
        ...timeSegmentMinValues,
    };

    return {
        mask: createTimeMaskExpression(mode),
        preprocessors: [
            createFullWidthToHalfWidthPreprocessor(),
            createColonConvertPreprocessor(),
            createZeroPlaceholdersPreprocessor(),
            createMeridiemPreprocessor(mode),
            createInvalidTimeSegmentInsertionPreprocessor({
                timeMode: mode,
                timeSegmentMinValues: enrichedTimeSegmentMinValues,
                timeSegmentMaxValues: enrichedTimeSegmentMaxValues,
            }),
        ],
        postprocessors: [
            createMeridiemPostprocessor(mode),
            (elementState) =>
                enrichTimeSegmentsWithZeroes(elementState, {
                    mode,
                    timeSegmentMaxValues: enrichedTimeSegmentMaxValues,
                }),
        ],
        plugins: [
            createTimeSegmentsSteppingPlugin({
                fullMode: mode,
                step,
                timeSegmentMaxValues: enrichedTimeSegmentMaxValues,
            }),
            createMeridiemSteppingPlugin(mode.indexOf('AA')),
        ],
        overwriteMode: 'replace',
    };
}
