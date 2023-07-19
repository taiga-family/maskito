import {MaskitoPlugin} from '@maskito/core';

import {maskitoEventHandler} from '../../../plugins';
import {createLeadingZeroesValidationPostprocessor} from '../processors';

const DUMMY_SELECTION = [0, 0] as const;

/**
 * It removes repeated leading zeroes for integer part on blur-event.
 * @example 000000 => blur => 0
 * @example 00005 => blur => 5
 */
export function createLeadingZeroesValidationPlugin(
    decimalSeparator: string,
    thousandSeparator: string,
): MaskitoPlugin {
    const dropRepeatedLeadingZeroes = createLeadingZeroesValidationPostprocessor(
        decimalSeparator,
        thousandSeparator,
    );

    return maskitoEventHandler(
        'blur',
        element => {
            const newValue = dropRepeatedLeadingZeroes(
                {
                    value: element.value,
                    selection: DUMMY_SELECTION,
                },
                {value: '', selection: DUMMY_SELECTION},
            ).value;

            if (element.value !== newValue) {
                element.value = newValue;
                element.dispatchEvent(new Event('input'));
            }
        },
        {capture: true},
    );
}
