import {
    DEFAULT_TIME_SEGMENT_MAX_VALUES,
    DEFAULT_TIME_SEGMENT_MIN_VALUES,
    TIME_FIXED_CHARACTERS,
} from '../../../constants';
import {type MaskitoTimeParams} from '../time-params';

export function withTimeDefaults({
    mode,
    separators,
    timeSegmentMaxValues = {},
    timeSegmentMinValues = {},
    ...params
}: MaskitoTimeParams): Required<MaskitoTimeParams> & {
    timeSegmentMaxValues: Required<MaskitoTimeParams['timeSegmentMaxValues']>;
    timeSegmentMinValues: Required<MaskitoTimeParams['timeSegmentMinValues']>;
} {
    const hasMeridiem = mode.includes('AA');

    const defaultSeparators = Array.from(mode.replace(' AA', '')).filter((char) =>
        TIME_FIXED_CHARACTERS.includes(char),
    );

    return {
        mode,
        step: 0,
        prefix: '',
        postfix: '',
        ...params,
        separators: defaultSeparators.map((fallback, i) => separators?.[i] ?? fallback),
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
