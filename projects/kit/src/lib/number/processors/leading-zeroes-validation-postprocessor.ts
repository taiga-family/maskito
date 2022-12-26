import {MaskitoOptions} from '@maskito/core';

/**
 * It removes leading zeroes for integer part.
 * @example 0,|00005 => Backspace => |5
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
        const integersWithNoRepeatedZeroes = integerPart.replace(/^0+/, '0');
        const newIntegerPart =
            integersWithNoRepeatedZeroes.length > 1 &&
            integersWithNoRepeatedZeroes.startsWith('0')
                ? integersWithNoRepeatedZeroes.slice(1)
                : integersWithNoRepeatedZeroes;

        const removedCharacters = integerPart.length - newIntegerPart.length;

        return {
            value:
                newIntegerPart +
                (hasDecimalSeparator ? decimalSeparator : '') +
                decimalPart,
            selection: [
                Math.max(from - removedCharacters, 0),
                Math.max(to - removedCharacters, 0),
            ],
        };
    };
}
