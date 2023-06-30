import {MaskitoPlugin, maskitoTransform} from '@maskito/core';

import {maskitoEventHandler} from '../../../plugins';
import {clamp} from '../../../utils';
import {maskitoParseNumber, stringifyNumberWithoutExp} from '../utils';

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
    return maskitoEventHandler(
        'blur',
        (element, options) => {
            const parsedNumber = maskitoParseNumber(element.value, decimalSeparator);
            const clampedNumber = clamp(parsedNumber, min, max);

            if (!Number.isNaN(parsedNumber) && parsedNumber !== clampedNumber) {
                element.value = maskitoTransform(
                    stringifyNumberWithoutExp(clampedNumber),
                    options,
                );
                element.dispatchEvent(new Event('input'));
            }
        },
        {capture: true},
    );
}
