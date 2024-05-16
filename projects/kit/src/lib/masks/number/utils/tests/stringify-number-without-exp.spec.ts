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
});
