import {MaskitoPlugin} from '@maskito/core';

import {maskitoEventHandler} from '../../../plugins';
import {escapeRegExp} from '../../../utils';

/**
 * It pads EMPTY integer part with zero if decimal parts exists.
 * It works on blur event only!
 * @example 1|,23 => Backspace => Blur => 0,23
 */
export function createNotEmptyIntegerPlugin(decimalSeparator: string): MaskitoPlugin {
    return maskitoEventHandler('blur', element => {
        const newValue = element.value.replace(
            new RegExp(`^(\\D+)?${escapeRegExp(decimalSeparator)}`),
            `$10${decimalSeparator}`,
        );

        if (newValue !== element.value) {
            element.value = newValue;
            element.dispatchEvent(new Event('input'));
        }
    });
}
