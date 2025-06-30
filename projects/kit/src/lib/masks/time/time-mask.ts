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
    maskitoPostfixPostprocessorGenerator,
    maskitoPrefixPostprocessorGenerator,
} from '../../processors';
import type {MaskitoTimeSegments} from '../../types';
import {createTimeMaskExpression, enrichTimeSegmentsWithZeroes} from '../../utils/time';
import type {MaskitoTimeParams} from './time-params';

export function maskitoTimeOptionsGenerator({
    mode,
    timeSegmentMaxValues = {},
    timeSegmentMinValues = {},
    step = 0,
    prefix = '',
    postfix = '',
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
    const maskExpression = [...prefix, ...createTimeMaskExpression(mode)];

    return {
        mask: postfix
            ? ({value}) => cutExpression(maskExpression, value).concat(...postfix)
            : maskExpression,
        preprocessors: [
            createFullWidthToHalfWidthPreprocessor(),
            createColonConvertPreprocessor(),
            createZeroPlaceholdersPreprocessor(postfix),
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
            maskitoPrefixPostprocessorGenerator(prefix),
            maskitoPostfixPostprocessorGenerator(postfix),
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

function cutExpression(
    expression: Array<RegExp | string>,
    value: string,
): Array<RegExp | string> {
    let digitsCount =
        Math.min(
            value.replaceAll(/\D/g, '').length,
            expression.filter((x) => typeof x !== 'string').length,
        ) || 1;
    const afterLastDigit =
        expression.findIndex((x) => typeof x !== 'string' && !--digitsCount) + 1;

    return expression.slice(0, afterLastDigit);
}
