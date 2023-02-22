import {MaskitoOptions, maskitoPipe} from '@maskito/core';

import {DEFAULT_TIME_SEGMENT_MAX_VALUES, TIME_FIXED_CHARACTERS} from '../../constants';
import {createZeroPlaceholdersPreprocessor} from '../../processors';
import {MaskitoTimeMode, MaskitoTimeSegments} from '../../types';
import {createMaxValidationPreprocessor} from './processors';

export function maskitoTimeOptionsGenerator({
    mode,
    timeSegmentMaxValues = {},
}: {
    mode: MaskitoTimeMode;
    timeSegmentMaxValues?: Partial<MaskitoTimeSegments<number>>;
}): MaskitoOptions {
    const enrichedTimeSegmentMaxValues = {
        ...DEFAULT_TIME_SEGMENT_MAX_VALUES,
        ...timeSegmentMaxValues,
    };

    return {
        mask: Array.from(mode).map(char =>
            TIME_FIXED_CHARACTERS.includes(char) ? char : /\d/,
        ),
        preprocessor: maskitoPipe(
            createZeroPlaceholdersPreprocessor(),
            createMaxValidationPreprocessor(enrichedTimeSegmentMaxValues),
        ),
        overwriteMode: 'replace',
    };
}
