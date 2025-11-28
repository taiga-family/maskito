import type {MaskitoPostprocessor} from '@maskito/core';

import {CHAR_HYPHEN} from '../../../constants';
import {clamp} from '../../../utils';
import type {MaskitoNumberParams} from '../number-params';
import {maskitoParseNumber} from '../utils';

/**
 * This postprocessor is connected with {@link createMinMaxPlugin}:
 * both validate `min`/`max` bounds of entered value (but at the different point of time).
 */
export function createMinMaxPostprocessor({
    min,
    max,
    decimalSeparator,
    minusSign,
    maximumFractionDigits,
}: Pick<
    Required<MaskitoNumberParams>,
    'decimalSeparator' | 'max' | 'maximumFractionDigits' | 'min' | 'minusSign'
>): MaskitoPostprocessor {
    return ({value, selection}) => {
        const parsedNumber = maskitoParseNumber(value, {
            decimalSeparator,
            minusSign,
            bigint: !(maximumFractionDigits && value.includes(decimalSeparator)),
        });
        const limitedValue =
            /**
             * We cannot limit lower bound if user enters positive number.
             * The same for upper bound and negative number.
             * ___
             * @example (min = 5)
             * Empty input => Without this condition user cannot type 42 (the first digit will be rejected)
             * ___
             * @example (max = -10)
             * Value is -10 => Without this condition user cannot delete 0 to enter another digit
             */
            parsedNumber > 0 ? clamp(parsedNumber, null, max) : clamp(parsedNumber, min);

        if (parsedNumber && limitedValue !== parsedNumber) {
            const newValue = `${limitedValue}`
                .replace('.', decimalSeparator)
                .replace(CHAR_HYPHEN, minusSign);

            return {
                value: newValue,
                selection: [newValue.length, newValue.length],
            };
        }

        return {
            value,
            selection,
        };
    };
}
