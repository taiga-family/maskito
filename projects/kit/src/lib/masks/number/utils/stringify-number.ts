import {maskitoTransform} from '@maskito/core';

import {clamp} from '../../../utils';
import {maskitoNumberOptionsGenerator} from '../number-mask';
import type {MaskitoNumberParams} from '../number-params';
import {stringifyNumberWithoutExp} from './stringify-number-without-exp';

export function maskitoStringifyNumber(
    number: bigint | number | null,
    params: MaskitoNumberParams,
): string {
    if (Number.isNaN(number) || number === null) {
        return '';
    }

    const {min = -Infinity, max = Infinity, decimalSeparator = '.'} = params;

    const value = stringifyNumberWithoutExp(clamp(number, min, max)).replace(
        '.',
        decimalSeparator,
    );

    return maskitoTransform(value, maskitoNumberOptionsGenerator(params));
}
