import {maskitoTransform} from '@maskito/core';

import {clamp} from '../../../utils';
import {maskitoNumber} from '../number-mask';
import type {MaskitoNumberParams} from '../number-params';
import {stringifyNumberWithoutExp} from './stringify-number-without-exp';
import {withNumberDefaults} from './with-number-defaults';

export function maskitoStringifyNumber(
    number: bigint | number | null,
    optionalParams: MaskitoNumberParams,
): string {
    if (Number.isNaN(number) || number === null) {
        return '';
    }

    const params = withNumberDefaults(optionalParams);
    const value = stringifyNumberWithoutExp(
        clamp(number, params.min, params.max),
    ).replace('.', params.decimalSeparator);

    return maskitoTransform(value, maskitoNumber(params));
}
