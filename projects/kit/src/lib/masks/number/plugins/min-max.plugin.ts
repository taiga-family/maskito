import {MaskitoPlugin} from '@maskito/core';

import {maskitoEventHandler} from '../../../plugins';
import {clamp} from '../../../utils';
import {maskitoParseNumber} from '../utils';

/**
 * This plugin is connected with {@link createMinMaxPostprocessor}:
 * both validate `min`/`max` bounds of entered value (but at the different point of time).
 */
export function createMinMaxPlugin({
    min,
    max,
    decimalSeparator,
}: {
    min: number;
    max: number;
    decimalSeparator: string;
}): MaskitoPlugin {
    return maskitoEventHandler('blur', element => {
        const parsedNumber = maskitoParseNumber(element.value, decimalSeparator);
        const newValue = clamp(parsedNumber, min, max).toString();

        if (newValue !== element.value) {
            element.value = newValue;
            element.dispatchEvent(new Event('input'));
        }
    });
}
