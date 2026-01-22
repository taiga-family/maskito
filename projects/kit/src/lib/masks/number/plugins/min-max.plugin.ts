import type {MaskitoPlugin} from '@maskito/core';
import {maskitoTransform, maskitoUpdateElement} from '@maskito/core';

import {maskitoEventHandler} from '../../../plugins';
import {clamp} from '../../../utils';
import type {MaskitoNumberParams} from '../number-params';
import {maskitoParseNumber, stringifyNumberWithoutExp} from '../utils';

/**
 * This plugin is connected with {@link createMinMaxPostprocessor}:
 * both validate `min`/`max` bounds of entered value (but at the different point of time).
 */
export function createMinMaxPlugin({
    min,
    max,
    decimalSeparator,
    minusSign,
    maximumFractionDigits,
}: Pick<
    Required<MaskitoNumberParams>,
    'decimalSeparator' | 'max' | 'maximumFractionDigits' | 'min' | 'minusSign'
>): MaskitoPlugin {
    return maskitoEventHandler(
        'blur',
        (element, options) => {
            const parsedNumber =
                maskitoParseNumber(element.value, {
                    decimalSeparator,
                    minusSign,
                    bigint:
                        !maximumFractionDigits &&
                        !element.value.includes(decimalSeparator),
                }) ?? NaN;
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
