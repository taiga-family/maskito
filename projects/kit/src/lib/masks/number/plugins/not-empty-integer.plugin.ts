import type {MaskitoPlugin} from '@maskito/core';
import {maskitoUpdateElement} from '@maskito/core';

import {maskitoEventHandler} from '../../../plugins';
import {escapeRegExp, noop} from '../../../utils';
import type {MaskitoNumberParams} from '../number-params';
import {fromNumberParts, toNumberParts} from '../utils';

/**
 * It pads EMPTY integer part with zero if decimal parts exists.
 * It works on blur event only!
 * @example 1|,23 => Backspace => Blur => 0,23
 */
export function createNotEmptyIntegerPlugin(
    params: Pick<
        Required<MaskitoNumberParams>,
        | 'decimalPseudoSeparators'
        | 'decimalSeparator'
        | 'maximumFractionDigits'
        | 'minusPseudoSigns'
        | 'minusSign'
        | 'negativePattern'
        | 'postfix'
        | 'prefix'
    >,
): MaskitoPlugin {
    const {decimalSeparator} = params;

    if (!decimalSeparator) {
        return noop;
    }

    return maskitoEventHandler(
        'blur',
        (element) => {
            const {prefix, postfix, ...numberParts} = toNumberParts(
                element.value,
                params,
            );
            const onlyNumber = fromNumberParts(numberParts, params).replace(
                new RegExp(`^(\\D+)?${escapeRegExp(decimalSeparator)}`),
                `$10${decimalSeparator}`,
            );
            const newValue = fromNumberParts(
                {
                    ...toNumberParts(onlyNumber, params),
                    prefix,
                    postfix,
                },
                params,
            );

            maskitoUpdateElement(element, newValue);
        },
        {capture: true},
    );
}
