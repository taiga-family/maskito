import {MaskitoPostprocessor} from '@maskito/core';

import {escapeRegExp} from '../../../utils';

/**
 * It removes repeated leading zeroes for integer part.
 * @example 0,|00005 => Backspace => |5
 * @example -0,|00005 => Backspace => -|5
 * @example User types "000000" => 0|
 * @example 0| => User types "5" => 5|
 */
export function createLeadingZeroesValidationPostprocessor(
    decimalSeparator: string,
    thousandSeparator: string,
): MaskitoPostprocessor {
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

    const countTrimmedZeroesBefore = (value: string, index: number): number => {
        const valueBefore = value.slice(0, index);
        const followedByZero = value.slice(index).startsWith('0');

        return (
            valueBefore.length -
            trimLeadingZeroes(valueBefore).length +
            (followedByZero ? 1 : 0)
        );
    };

    return ({value, selection}) => {
        const [from, to] = selection;
        const hasDecimalSeparator = value.includes(decimalSeparator);
        const [integerPart, decimalPart = ''] = value.split(decimalSeparator);
        const zeroTrimmedIntegerPart = trimLeadingZeroes(integerPart);

        if (integerPart === zeroTrimmedIntegerPart) {
            return {value, selection};
        }

        const newFrom = from - countTrimmedZeroesBefore(value, from);
        const newTo = to - countTrimmedZeroesBefore(value, to);

        return {
            value:
                zeroTrimmedIntegerPart +
                (hasDecimalSeparator ? decimalSeparator : '') +
                decimalPart,
            selection: [Math.max(newFrom, 0), Math.max(newTo, 0)],
        };
    };
}
