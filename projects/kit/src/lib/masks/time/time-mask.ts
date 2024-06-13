import type {MaskitoOptions} from '@maskito/core';
import {MASKITO_DEFAULT_OPTIONS} from '@maskito/core';

import {DEFAULT_TIME_SEGMENT_MAX_VALUES, TIME_FIXED_CHARACTERS} from '../../constants';
import {createTimeSegmentsSteppingPlugin} from '../../plugins';
import {
    createColonConvertPreprocessor,
    createFullWidthToHalfWidthPreprocessor,
    createZeroPlaceholdersPreprocessor,
} from '../../processors';
import {createMaxValidationPreprocessor} from './processors';
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
        ...MASKITO_DEFAULT_OPTIONS,
        mask: Array.from(mode).map(char =>
            TIME_FIXED_CHARACTERS.includes(char) ? char : /\d/,
        ),
        preprocessors: [
            createFullWidthToHalfWidthPreprocessor(),
            createColonConvertPreprocessor(),
            createZeroPlaceholdersPreprocessor(),
            createMaxValidationPreprocessor(enrichedTimeSegmentMaxValues, mode),
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
