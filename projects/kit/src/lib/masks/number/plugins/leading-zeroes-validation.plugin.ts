import {MaskitoPlugin} from '@maskito/core';

import {maskitoEventHandler} from '../../../plugins';
import {escapeRegExp} from '../../../utils';

/**
 * It removes repeated leading zeroes for integer part on blur-event.
 * @example 000000 => blur => 0
 * @example 00005 => blur => 5
 */
export function createLeadingZeroesValidationPlugin(
    decimalSeparator: string,
    thousandSeparator: string,
): MaskitoPlugin {
    const trimLeadingZeroes = (value: string): string => {
        const escapedThousandSeparator = escapeRegExp(thousandSeparator);

        return value
            .replace(
                // all leading zeroes followed by another zero
                new RegExp(`^(\\D+)?[0${escapedThousandSeparator}]+(?=0)`),
                '$1',
            )
            .replace(
                // zero followed by not-zero digit
                new RegExp(`^(\\D+)?[0${escapedThousandSeparator}]+(?=[1-9])`),
                '$1',
            );
    };

    return maskitoEventHandler(
        'blur',
        element => {
            const {value} = element;
            const hasDecimalSeparator = value.includes(decimalSeparator);
            const [integerPart, decimalPart = ''] = value.split(decimalSeparator);
            const zeroTrimmedIntegerPart = trimLeadingZeroes(integerPart);

            if (integerPart === zeroTrimmedIntegerPart) {
                return;
            }

            element.value =
                zeroTrimmedIntegerPart +
                (hasDecimalSeparator ? decimalSeparator : '') +
                decimalPart;
            element.dispatchEvent(new Event('input'));
        },
        {capture: true},
    );
}
