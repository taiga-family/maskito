import {MaskitoPlugin, maskitoTransform, maskitoUpdateElement} from '@maskito/core';

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
    prefix,
    postfix,
}: {
    min: number;
    max: number;
    decimalSeparator: string;
    prefix: string;
    postfix: string;
}): MaskitoPlugin {
    return maskitoEventHandler(
        'blur',
        (element, options) => {
            const parsedNumber = maskitoParseNumber(
                element.value,
                decimalSeparator,
                prefix,
                postfix,
            );
            const clampedNumber = clamp(parsedNumber, min, max);

            if (!Number.isNaN(parsedNumber) && parsedNumber !== clampedNumber) {
                maskitoUpdateElement(
                    element,
                    maskitoTransform(stringifyNumberWithoutExp(clampedNumber), options),
                );
            }
        },
        {capture: true},
    );
}
