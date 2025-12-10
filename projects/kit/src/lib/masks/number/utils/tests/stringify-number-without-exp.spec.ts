import {describe, expect, it} from '@jest/globals';

import {stringifyNumberWithoutExp} from '../stringify-number-without-exp';

describe('number converting to string without exponent', () => {
    it('value with exponent and without fractional part and precision > 6', () => {
        expect(stringifyNumberWithoutExp(1e-10)).toBe('0.0000000001');
    });

    it('value with exponent and fractional part and precision > 6', () => {
        expect(stringifyNumberWithoutExp(1.23e-8)).toBe('0.0000000123');
    });

    it('negative value with exponent and fractional part and precision > 6', () => {
        expect(stringifyNumberWithoutExp(-1.23e-8)).toBe('-0.0000000123');
    });

    it('integer value', () => {
        expect(stringifyNumberWithoutExp(1)).toBe('1');
    });

    it('integer value with zeros', () => {
        expect(stringifyNumberWithoutExp(100)).toBe('100');
    });

    it('fractional value without exponent', () => {
        expect(stringifyNumberWithoutExp(0.111)).toBe('0.111');
    });

    it('negative integer value', () => {
        expect(stringifyNumberWithoutExp(-100)).toBe('-100');
    });

    it('negative fractional value', () => {
        expect(stringifyNumberWithoutExp(-1e-2)).toBe('-0.01');
    });

    it('fractional value with exponent and precision equals 4', () => {
        expect(stringifyNumberWithoutExp(2.23e-2)).toBe('0.0223');
    });

    it('very small exponent that exceeds toFixed limit must expand manually', () => {
        expect(stringifyNumberWithoutExp(102.282e-112)).toBe(
            '0.0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000102282',
        );
    });

    it('positive exponent should use full wide expansion', () => {
        expect(stringifyNumberWithoutExp(1e25)).toBe('10000000000000000000000000');
    });

    it('zero', () => {
        expect(stringifyNumberWithoutExp(0)).toBe('0');
    });

    it('negative zero formatted correctly', () => {
        expect(stringifyNumberWithoutExp(-0)).toBe('0');
    });

    it('bigint basic', () => {
        expect(stringifyNumberWithoutExp(123n)).toBe('123');
    });

    it('negative bigint', () => {
        expect(stringifyNumberWithoutExp(-999999999999999999999n)).toBe(
            '-999999999999999999999',
        );
    });

    it('large negative exponent simple case', () => {
        expect(stringifyNumberWithoutExp(5e-5)).toBe('0.00005');
    });

    it('decimal with many zeros inside exponent', () => {
        expect(stringifyNumberWithoutExp(9.001e-4)).toBe('0.0009001');
    });

    it('positive exponent with fractional part', () => {
        expect(stringifyNumberWithoutExp(3.14e5)).toBe('314000');
    });
});
