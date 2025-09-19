import type {MaskitoPlugin} from '@maskito/core';
import {maskitoUpdateElement} from '@maskito/core';

import {maskitoEventHandler} from '../../../plugins';
import type {MaskitoNumberParams} from '../number-params';
import {createLeadingZeroesValidationPostprocessor} from '../processors';

const DUMMY_SELECTION = [0, 0] as const;

/**
 * It removes repeated leading zeroes for integer part on blur-event.
 * @example 000000 => blur => 0
 * @example 00005 => blur => 5
 */
export function createLeadingZeroesValidationPlugin(
    params: Pick<
        Required<MaskitoNumberParams>,
        | 'decimalPseudoSeparators'
        | 'decimalSeparator'
        | 'minusPseudoSigns'
        | 'minusSign'
        | 'negativePattern'
        | 'postfix'
        | 'prefix'
        | 'thousandSeparator'
    >,
): MaskitoPlugin {
    const dropRepeatedLeadingZeroes = createLeadingZeroesValidationPostprocessor(params);

    return maskitoEventHandler(
        'blur',
        (element) => {
            const newValue = dropRepeatedLeadingZeroes(
                {
                    value: element.value,
                    selection: DUMMY_SELECTION,
                },
                {value: '', selection: DUMMY_SELECTION},
            ).value;

            maskitoUpdateElement(element, newValue);
        },
        {capture: true},
    );
}
