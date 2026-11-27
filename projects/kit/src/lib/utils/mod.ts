/**
 * Wraps a value into the range from min (inclusive) to max (exclusive).
 */
export function mod(value: number, min: number, max: number): number {
    const range = max - min;

    return ((((value - min) % range) + range) % range) + min;
}
