import {MaskitoOptions} from '@maskito/core';
import {maskitoNumberOptionsGenerator} from '@maskito/kit';

export function getMaskitoOptions(minusSign: string): MaskitoOptions {
    return maskitoNumberOptionsGenerator({
        thousandSeparator: '',
        minusSign,
    });
}
