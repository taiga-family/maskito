import {CHAR_HYPHEN} from '../../../constants';
import {toNumberParts} from './number-parts';

const LOCALE: Intl.Locale[] = [];
const DEFAULT = {
    minusSign: CHAR_HYPHEN,
    minusPseudoSigns: [],
    prefix: '',
    postfix: '',
    decimalSeparator: '.',
    decimalPseudoSeparators: [],
    maximumFractionDigits: Infinity,
};

/**
 * Converts a number to a decimal string without using exponential notation.
 *
 * - Numbers without exponent are returned as-is.
 * - Numbers with a positive exponent (`e+N`) are expanded using locale formatting.
 * - Numbers with a negative exponent (`e-N`) are expanded manually to avoid
 *   precision limits of `Number#toFixed` and locale rounding.
 *
 * The sign of the number and the sign of the exponent are handled independently.
 * This guarantees correct formatting for cases like `-1.23e-8`.
 *
 * @param value Number or bigint to convert.
 * @returns Full decimal string representation without exponent notation.
 *
 * @example
 * stringifyNumberWithoutExp(1e25)
 * // "10000000000000000000000000"
 *
 * @example
 * stringifyNumberWithoutExp(1.23e-8)
 * // "0.0000000123"
 *
 * @example
 * stringifyNumberWithoutExp(-1.23e-8)
 * // "-0.0000000123"
 */
export function stringifyNumberWithoutExp(value: bigint | number): string {
    const valueAsString = String(value);
    const [numberPart = '', exponent] = valueAsString.split('e');

    if (!exponent) {
        return valueAsString;
    }

    if (!exponent.startsWith(CHAR_HYPHEN)) {
        return value.toLocaleString(LOCALE, {useGrouping: false});
    }

    const {minus, integerPart, decimalPart} = toNumberParts(numberPart, DEFAULT);
    const digits = integerPart + decimalPart;
    const shift = Math.abs(Number(exponent));
    const totalZeros = shift - integerPart.length;

    let result: string;

    if (totalZeros >= 0) {
        result = `0.${'0'.repeat(totalZeros)}${digits}`;
    } else {
        const index = integerPart.length - shift;

        result = `${digits.slice(0, index)}.${digits.slice(index)}`;
    }

    return minus + result;
}
