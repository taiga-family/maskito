/**
 * Clamps a value between two inclusive limits
 *
 * @param value
 * @param min lower limit
 * @param max upper limit
 */
export function clamp<T extends Date | number>(value: T, min: T, max: T): T {
    const clampedValue = Math.min(Number(max), Math.max(Number(min), Number(value)));

    return (value instanceof Date ? new Date(clampedValue) : clampedValue) as T;
}
