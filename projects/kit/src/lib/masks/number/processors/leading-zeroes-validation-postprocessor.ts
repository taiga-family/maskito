import {MaskitoOptions} from '@maskito/core';

/**
 * It removes repeated leading zeroes for integer part.
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

function trimLeadingZeroes(value: string): string {
    return value
        .replace(/^(\D+)?0+(?=0)/, '$1') // all leading zeroes followed by another zero
        .replace(/^(\D+)?0+(?=[1-9])/, '$1'); // zero followed by not-zero digit
}

function countTrimmedZeroesBefore(value: string, index: number): number {
    const valueBefore = value.slice(0, index);
    const followedByZero = value.slice(index).startsWith('0');

    return (
        valueBefore.length -
        trimLeadingZeroes(valueBefore).length +
        (followedByZero ? 1 : 0)
    );
}
