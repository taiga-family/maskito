/**
 * Clamps a value between two inclusive limits
 */
export function clamp<T extends Date | bigint | number>(
    value: T,
    minimum: T | null,
    maximum?: T | null,
): T {
    const minClamped = max(minimum ?? value, value);

    return min(maximum ?? minClamped, minClamped);
}

function min<T extends Date | bigint | number>(x: T, ...values: T[]): T {
    return values.reduce((a, b) => (a < b ? a : b), x);
}

function max<T extends Date | bigint | number>(x: T, ...values: T[]): T {
    return values.reduce((a, b) => (a > b ? a : b), x);
}
