import {
    DEFAULT_TIME_SEGMENT_MAX_VALUES,
    DEFAULT_TIME_SEGMENT_MIN_VALUES,
    TIME_FIXED_CHARACTERS,
} from '../../../constants';
import {hasDayPeriod} from '../../../utils/time';
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
    const dayPeriod = mode.includes('AA') // TODO(v6): drop backward-compat for `'... AA'` modes and require explicit `dayPeriod` for 12-hour format
        ? (['AM', 'PM'] as const)
        : (params.dayPeriod ?? ['', '']);

    const hasMeridiem = hasDayPeriod(dayPeriod);

    const defaultSeparators = Array.from(mode.replace(' AA', '')).filter((char) =>
        TIME_FIXED_CHARACTERS.includes(char),
    );

    return {
        mode,
        step: 0,
        prefix: '',
        postfix: '',
        ...params,
        dayPeriod,
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
