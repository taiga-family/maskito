import type {MaskitoOptions} from '@maskito/core';

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
import {
    createTimeMaskExpression,
    enrichTimeSegmentsWithZeroes,
    hasDayPeriod,
} from '../../utils/time';
import type {MaskitoTimeParams} from './time-params';
import {withTimeDefaults} from './utils/with-time-defaults';

export function maskitoTime(params: MaskitoTimeParams): Required<MaskitoOptions> {
    const {
        mode,
        separators,
        dayPeriod,
        prefix,
        postfix,
        timeSegmentMinValues,
        timeSegmentMaxValues,
        step,
    } = withTimeDefaults(params);

    const maskExpression = [
        ...prefix,
        ...createTimeMaskExpression({mode, separators, dayPeriod}),
    ];

    return {
        mask: postfix
            ? ({value}) => cutExpression(maskExpression, value).concat(...postfix)
            : maskExpression,
        preprocessors: [
            createFullWidthToHalfWidthPreprocessor(),
            createColonConvertPreprocessor(),
            createZeroPlaceholdersPreprocessor(postfix),
            createMeridiemPreprocessor(dayPeriod),
            createInvalidTimeSegmentInsertionPreprocessor({
                timeMode: mode,
                timeSegmentMinValues,
                timeSegmentMaxValues,
            }),
        ],
        postprocessors: [
            createMeridiemPostprocessor(dayPeriod),
            (elementState) =>
                enrichTimeSegmentsWithZeroes(elementState, {
                    mode,
                    timeSegmentMaxValues,
                    separators,
                }),
            maskitoPrefixPostprocessorGenerator(prefix),
            maskitoPostfixPostprocessorGenerator(postfix),
        ],
        plugins: [
            createTimeSegmentsSteppingPlugin({
                fullMode: mode,
                step,
                timeSegmentMinValues,
                timeSegmentMaxValues,
            }),
            createMeridiemSteppingPlugin({
                dayPeriod,
                meridiemStartIndex: hasDayPeriod(dayPeriod)
                    ? maskExpression.length - dayPeriod[0].length
                    : -1,
            }),
        ],
        overwriteMode: 'replace',
    };
}

export {
    /**
     * @deprecated Use {@link maskitoTime} instead.
     */
    maskitoTime as maskitoTimeOptionsGenerator,
};

/**
 * Without cutting, the mask expression removes postfix on the last digit deletion
 * ___
 * Case 1 (static pattern mask expression)
 * Mask expression is [/\d/, /\d/, ':', /\d/, /\d/, ' left']
 * 12:34| left => Press Backspace => 12:3|
 * Mask correctly removes postfix because it's fixed characters after not yet inserted 4th digit.
 * ___
 * Case 2 (dynamic pattern mask expression)
 * Mask expression is [/\d/, /\d/, ':', /\d/, /\d/, ' left'] & textfield contains `12:34 left`
 * 12:34| left => Press Backspace => Mask expression becomes [/\d/, /\d/, ':', /\d/, ' left']  => 12:3| left
 * Mask correctly does not remove postfix because it's trailing fixed characters
 * and all non-fixed characters were already inserted.
 */
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
