import type {MaskitoOptions} from '@maskito/core';
import {MASKITO_DEFAULT_OPTIONS} from '@maskito/core';

import {DEFAULT_TIME_SEGMENT_MAX_VALUES, TIME_FIXED_CHARACTERS} from '../../constants';
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
}: {
    mode: MaskitoTimeMode;
    timeSegmentMaxValues?: Partial<MaskitoTimeSegments<number>>;
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
            createMaxValidationPreprocessor(enrichedTimeSegmentMaxValues, mode),
        ],
        overwriteMode: 'replace',
    };
}
