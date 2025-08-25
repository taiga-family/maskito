import type {MaskitoPostprocessor} from '@maskito/core';
import type {MaskitoNumberParams} from '@maskito/kit';
import {maskitoPrefixPostprocessorGenerator} from '@maskito/kit';

import {extractPrefixInfo} from '../utils';

export function createNumberPrefixPostprocessor(
    params: Pick<Required<MaskitoNumberParams>, 'minusSign' | 'prefix'>,
): MaskitoPostprocessor {
    const {prefix, prefixIndex} = extractPrefixInfo(params);
    const {minusSign} = params;

    return ({value, selection}, initialElementState) =>
        maskitoPrefixPostprocessorGenerator(
            value.includes(minusSign) && prefixIndex > 0 ? minusSign + prefix : prefix,
        )({value, selection}, initialElementState);
}
