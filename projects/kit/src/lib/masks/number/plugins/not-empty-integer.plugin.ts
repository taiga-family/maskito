import {MaskitoPlugin, maskitoUpdateElement} from '@maskito/core';

import {maskitoEventHandler} from '../../../plugins';
import {escapeRegExp, extractAffixes} from '../../../utils';

/**
 * It pads EMPTY integer part with zero if decimal parts exists.
 * It works on blur event only!
 * @example 1|,23 => Backspace => Blur => 0,23
 */
export function createNotEmptyIntegerPlugin({
    decimalSeparator,
    prefix,
    postfix,
}: {
    decimalSeparator: string;
    prefix: string;
    postfix: string;
}): MaskitoPlugin {
    return maskitoEventHandler(
        'blur',
        element => {
            const {cleanValue, extractedPostfix, extractedPrefix} = extractAffixes(
                element.value,
                {prefix, postfix},
            );
            const newValue =
                extractedPrefix +
                cleanValue.replace(
                    new RegExp(`^(\\D+)?${escapeRegExp(decimalSeparator)}`),
                    `$10${decimalSeparator}`,
                ) +
                extractedPostfix;

            maskitoUpdateElement(element, newValue);
        },
        {capture: true},
    );
}
