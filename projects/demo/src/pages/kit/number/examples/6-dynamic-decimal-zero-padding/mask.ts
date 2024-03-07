import type {MaskitoOptions} from '@maskito/core';
import {maskitoNumberOptionsGenerator} from '@maskito/kit';

export function getMaskitoOptions(decimalZeroPadding: boolean): MaskitoOptions {
    return maskitoNumberOptionsGenerator({
        decimalZeroPadding,
        precision: 2,
        decimalSeparator: '.',
        min: 0,
    });
}
