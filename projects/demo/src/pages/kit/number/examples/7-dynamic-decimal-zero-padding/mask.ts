import type {MaskitoOptions} from '@maskito/core';
import {maskitoNumber} from '@maskito/kit';

export function getMaskitoOptions(decimalZeroPadding: boolean): MaskitoOptions {
    return maskitoNumber({
        minimumFractionDigits: decimalZeroPadding ? 2 : 0,
        maximumFractionDigits: 2,
        decimalSeparator: '.',
        min: 0,
    });
}
