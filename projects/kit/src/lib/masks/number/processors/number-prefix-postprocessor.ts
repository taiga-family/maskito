import type {MaskitoPostprocessor} from '@maskito/core';

import {maskitoPrefixPostprocessorGenerator} from '../../../processors';
import type {MaskitoNumberParams} from '../number-params';

export function createNumberPrefixPostprocessor({
    prefix,
    minusSign,
    negativePattern,
}: Pick<
    Required<MaskitoNumberParams>,
    'minusSign' | 'negativePattern' | 'prefix'
>): MaskitoPostprocessor {
    return ({value, selection}, initialElementState) =>
        maskitoPrefixPostprocessorGenerator(
            value.includes(minusSign) && negativePattern === 'minusFirst'
                ? minusSign + prefix
                : prefix,
        )({value, selection}, initialElementState);
}
