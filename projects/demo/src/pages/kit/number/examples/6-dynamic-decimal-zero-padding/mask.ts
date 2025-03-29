import type {MaskitoOptions} from '@maskito/core';
import {maskitoNumberOptionsGenerator} from '@maskito/kit';

export function getMaskitoOptions(decimalZeroPadding: boolean): MaskitoOptions {
    return maskitoNumberOptionsGenerator({
        minimumFractionDigits: decimalZeroPadding ? 2 : 0,
        maximumFractionDigits: 2,
        decimalSeparator: '.',
        min: 0,
    });
}
