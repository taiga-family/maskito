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

    if (!exponent.startsWith('-')) {
        return value.toLocaleString([], {useGrouping: false});
    }

    const sign = numberPart.startsWith('-') ? '-' : '';
    const unsignedNumberPart = sign ? numberPart.slice(1) : numberPart;
    const parts = unsignedNumberPart.split('.');
    const intPart = parts[0] ?? '';
    const fracPart = parts[1] ?? '';
    const digits = intPart + fracPart;
    const shift = Math.abs(Number(exponent));
    const totalZeros = shift - intPart.length;

    let result: string;

    if (totalZeros >= 0) {
        result = `0.${'0'.repeat(totalZeros)}${digits}`;
    } else {
        const index = intPart.length - shift;

        result = `${digits.slice(0, index)}.${digits.slice(index)}`;
    }

    return sign ? `-${result}` : result;
}
