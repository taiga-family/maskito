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
        element.value = element.value.replace(
            new RegExp(`^(\\D+)?${escapeRegExp(decimalSeparator)}`),
            `$10${decimalSeparator}`,
        );
    });
}
