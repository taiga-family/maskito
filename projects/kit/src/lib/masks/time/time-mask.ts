import type {MaskitoOptions} from '@maskito/core';
import {MASKITO_DEFAULT_OPTIONS} from '@maskito/core';

import {DEFAULT_TIME_SEGMENT_MAX_VALUES, TIME_FIXED_CHARACTERS} from '../../constants';
import {createTimeSegmentsSteppingPlugin} from '../../plugins/time-segments-stepping';
import {
    createColonConvertPreprocessor,
    createFullWidthToHalfWidthPreprocessor,
    createZeroPlaceholdersPreprocessor,
} from '../../processors';
import type {MaskitoTimeMode, MaskitoTimeSegments} from '../../types';
import {createMaxValidationPreprocessor} from './processors';

export function maskitoTimeOptionsGenerator({
    mode,
    timeSegmentMaxValues = {},
    step = 0,
}: {
    mode: MaskitoTimeMode;
    timeSegmentMaxValues?: Partial<MaskitoTimeSegments<number>>;
    step?: number;
}): Required<MaskitoOptions> {
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
            createMaxValidationPreprocessor(enrichedTimeSegmentMaxValues),
        ],
        plugins: [
            createTimeSegmentsSteppingPlugin({
                fullMode: mode,
                step,
            }),
        ],
        overwriteMode: 'replace',
    };
}
