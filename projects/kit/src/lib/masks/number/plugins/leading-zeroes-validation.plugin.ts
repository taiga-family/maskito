import {MaskitoPlugin, maskitoUpdateElement} from '@maskito/core';

import {maskitoEventHandler} from '../../../plugins';
import {createLeadingZeroesValidationPostprocessor} from '../processors';
import {extractPrefixAndPostfix} from '../utils/extract-prefix-and-postfix';

const DUMMY_SELECTION = [0, 0] as const;

/**
 * It removes repeated leading zeroes for integer part on blur-event.
 * @example 000000 => blur => 0
 * @example 00005 => blur => 5
 */
export function createLeadingZeroesValidationPlugin({
    decimalSeparator,
    thousandSeparator,
    prefix,
    postfix,
}: {
    decimalSeparator: string;
    thousandSeparator: string;
    prefix: string;
    postfix: string;
}): MaskitoPlugin {
    const dropRepeatedLeadingZeroes = createLeadingZeroesValidationPostprocessor(
        decimalSeparator,
        thousandSeparator,
    );

    return maskitoEventHandler(
        'blur',
        element => {
            const {cleanValue, extractedPostfix, extractedPrefix} =
                extractPrefixAndPostfix({
                    value: element.value,
                    prefix,
                    postfix,
                });

            const newValue =
                extractedPrefix +
                dropRepeatedLeadingZeroes(
                    {
                        value: cleanValue,
                        selection: DUMMY_SELECTION,
                    },
                    {value: '', selection: DUMMY_SELECTION},
                ).value +
                extractedPostfix;

            if (element.value !== newValue) {
                maskitoUpdateElement(element, newValue);
            }
        },
        {capture: true},
    );
}
