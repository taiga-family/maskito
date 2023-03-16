import {MaskitoOptions} from '@maskito/core';

import {CHAR_MINUS} from '../../../constants';

/**
 * It removes leading zeroes for integer part.
 * @example 0,|00005 => Backspace => |5
 * @example -0,|00005 => Backspace => -|5
 * @example User types "000000" => 0|
 * @example 0| => User types "5" => 5|
 */
export function createLeadingZeroesValidationPostprocessor(
    decimalSeparator: string,
): NonNullable<MaskitoOptions['postprocessor']> {
    return ({value, selection}) => {
        const [from, to] = selection;
        const hasDecimalSeparator = value.includes(decimalSeparator);
        const [integerPart, decimalPart = ''] = value.split(decimalSeparator);
        const zeroTrimmedIntegerPart = trimLeadingZeroes(integerPart);

        if (integerPart === zeroTrimmedIntegerPart) {
            return {value, selection};
        }

        const isIntegerPartEmpty =
            !zeroTrimmedIntegerPart || zeroTrimmedIntegerPart === CHAR_MINUS;
        const newIntegerPart = isIntegerPartEmpty
            ? `${zeroTrimmedIntegerPart}0`
            : zeroTrimmedIntegerPart;

        const newFrom =
            from - countTrimmedZeroesBefore(value, from) + Number(isIntegerPartEmpty);
        const newTo =
            to - countTrimmedZeroesBefore(value, to) + Number(isIntegerPartEmpty);

        return {
            value:
                newIntegerPart +
                (hasDecimalSeparator ? decimalSeparator : '') +
                decimalPart,
            selection: [Math.max(newFrom, 0), Math.max(newTo, 0)],
        };
    };
}

function trimLeadingZeroes(value: string): string {
    return value.replace(new RegExp(`^(${CHAR_MINUS})?0+`), '$1');
}

function countTrimmedZeroesBefore(value: string, index: number): number {
    const valueBefore = value.slice(0, index);

    return valueBefore.length - trimLeadingZeroes(valueBefore).length;
}
