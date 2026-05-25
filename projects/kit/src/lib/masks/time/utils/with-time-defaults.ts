import {
    DEFAULT_TIME_SEGMENT_MAX_VALUES,
    DEFAULT_TIME_SEGMENT_MIN_VALUES,
} from '../../../constants';
import {type MaskitoTimeParams} from '../time-params';

export function withTimeDefaults({
    mode,
    timeSegmentMaxValues = {},
    timeSegmentMinValues = {},
    ...params
}: MaskitoTimeParams): Required<MaskitoTimeParams> & {
    timeSegmentMaxValues: Required<MaskitoTimeParams['timeSegmentMaxValues']>;
    timeSegmentMinValues: Required<MaskitoTimeParams['timeSegmentMinValues']>;
} {
    const hasMeridiem = mode.includes('AA');

    return {
        mode,
        step: 0,
        prefix: '',
        postfix: '',
        separators: [],
        ...params,
        timeSegmentMinValues: {
            ...DEFAULT_TIME_SEGMENT_MIN_VALUES,
            ...(hasMeridiem ? {hours: 1} : {}),
            ...timeSegmentMinValues,
        },
        timeSegmentMaxValues: {
            ...DEFAULT_TIME_SEGMENT_MAX_VALUES,
            ...(hasMeridiem ? {hours: 12} : {}),
            ...timeSegmentMaxValues,
        },
    };
}
