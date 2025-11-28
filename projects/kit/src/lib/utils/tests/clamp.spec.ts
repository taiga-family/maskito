import {describe, expect, it} from '@jest/globals';

import {clamp} from '../clamp';

describe('clamp', () => {
    describe('number', () => {
        it('returns the original value when it satisfies limits', () => {
            expect(clamp(5, 0, 10)).toBe(5);
        });

        it('returns the minimum when the value is below the lower bound', () => {
            expect(clamp(-5, 0, 10)).toBe(0);
        });

        it('returns the maximum when the value exceeds the upper bound', () => {
            expect(clamp(15, 0, 10)).toBe(10);
        });

        it('ignores a null minimum and keeps enforcing the maximum', () => {
            expect(clamp(15, null, 10)).toBe(10);
        });

        it('ignores a null maximum and keeps enforcing the minimum', () => {
            expect(clamp(-5, 0, null)).toBe(0);
        });

        it('returns the incoming value when both bounds are null', () => {
            expect(clamp(7, null, null)).toBe(7);
        });
    });

    describe('bigint', () => {
        it('returns the original value when it satisfies limits', () => {
            expect(clamp(7n, 0n, 10n)).toBe(7n);
        });

        it('returns the minimum when the value is below the lower bound', () => {
            expect(clamp(-5n, 0n, 10n)).toBe(0n);
        });

        it('returns the maximum when the value exceeds the upper bound', () => {
            expect(clamp(15n, 0n, 10n)).toBe(10n);
        });

        it('ignores a null minimum and keeps enforcing the maximum', () => {
            expect(clamp(15n, null, 10n)).toBe(10n);
        });

        it('ignores a null maximum and keeps enforcing the minimum', () => {
            expect(clamp(-5n, 0n, null)).toBe(0n);
        });

        it('returns the incoming value when both bounds are null', () => {
            expect(clamp(42n, null, null)).toBe(42n);
        });

        it('handles negative bigint values', () => {
            expect(clamp(-10n, -5n, 5n)).toBe(-5n);
            expect(clamp(-3n, -5n, 5n)).toBe(-3n);
        });
    });

    describe('number with decimal part + min/max as bigint', () => {
        it('clamps decimal values below the bigint lower bound', () => {
            expect(clamp<bigint | number>(1.5, 2n, 5n)).toBe(2n);
        });

        it('keeps decimal values intact when they fall within bigint bounds', () => {
            expect(clamp<bigint | number>(3.123456789, 2n, 5n)).toBe(3.123456789);
        });

        it('clamps decimal values above the bigint upper bound', () => {
            expect(clamp<bigint | number>(6.98765432, 2n, 5n)).toBe(5n);
        });
    });

    describe('value is bigint + min/max as numbers with decimal point', () => {
        it('clamps bigint below the numeric lower bound', () => {
            expect(clamp<bigint | number>(1n, 1.5, 5.5)).toBe(1.5);
        });

        it('returns bigint when it lies within numeric bounds', () => {
            expect(clamp<bigint | number>(3n, 1.5, 5.5)).toBe(3n);
        });

        it('clamps bigint above the numeric upper bound', () => {
            expect(clamp<bigint | number>(10n, 1.5, 5.5)).toBe(5.5);
        });

        it('handles negative bigint with decimal bounds', () => {
            expect(clamp<bigint | number>(-10n, -5.5, 5.5)).toBe(-5.5);
            expect(clamp<bigint | number>(-3n, -5.5, 5.5)).toBe(-3n);
        });
    });

    describe('Date', () => {
        it('returns the original value (with same reference!) when it falls inside the inclusive range', () => {
            const lowerBound = new Date('2020-01-01T00:00:00Z');
            const value = new Date('2020-01-02T00:00:00Z');
            const upperBound = new Date('2020-01-03T00:00:00Z');

            expect(clamp(value, lowerBound, upperBound)).toBe(value);
        });

        it('returns the boundary when value falls outside the range', () => {
            const lowerBound = new Date('2020-01-01T00:00:00Z');
            const upperBound = new Date('2020-01-03T00:00:00Z');

            expect(clamp(new Date('2019-12-31T23:59:59Z'), lowerBound, upperBound)).toBe(
                lowerBound,
            );
            expect(clamp(new Date('2020-01-03T12:00:00Z'), lowerBound, upperBound)).toBe(
                upperBound,
            );
        });
    });
});
