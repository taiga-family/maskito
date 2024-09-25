import type {MaskitoOptions} from '@maskito/core';

import {DEFAULT_TIME_SEGMENT_MAX_VALUES, TIME_FIXED_CHARACTERS} from '../../constants';
import {createTimeSegmentsSteppingPlugin} from '../../plugins';
import {
    createColonConvertPreprocessor,
    createFullWidthToHalfWidthPreprocessor,
    createInvalidTimeSegmentInsertionPreprocessor,
    createZeroPlaceholdersPreprocessor,
} from '../../processors';
import {enrichTimeSegmentsWithZeroes} from '../../utils/time';
import type {MaskitoTimeParams} from './time-options';

export function maskitoTimeOptionsGenerator({
    mode,
    timeSegmentMaxValues = {},
    step = 0,
}: MaskitoTimeParams): Required<MaskitoOptions> {
    const enrichedTimeSegmentMaxValues = {
        ...DEFAULT_TIME_SEGMENT_MAX_VALUES,
        ...timeSegmentMaxValues,
    };

    return {
        mask: Array.from(mode).map((char) =>
            TIME_FIXED_CHARACTERS.includes(char) ? char : /\d/,
        ),
        preprocessors: [
            createFullWidthToHalfWidthPreprocessor(),
            createColonConvertPreprocessor(),
            createZeroPlaceholdersPreprocessor(),
            createInvalidTimeSegmentInsertionPreprocessor({
                timeMode: mode,
                timeSegmentMaxValues: enrichedTimeSegmentMaxValues,
            }),
        ],
        postprocessors: [
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
        ],
        overwriteMode: 'replace',
    };
}
