import {describe, expect, it} from '@jest/globals';

import {skipNonDigitCharacters} from '../skip-non-digit-characters';

describe('skipNonDigitCharacters', () => {
    it('returns the original selection when not collapsed', () => {
        expect(skipNonDigitCharacters('05/13/2026', [2, 5])).toEqual([2, 5]);
    });

    it('returns the original selection at the start of the value', () => {
        expect(skipNonDigitCharacters('/13/2026', [0, 0])).toEqual([0, 0]);
    });

    it('returns the original selection when the value is an empty string', () => {
        expect(skipNonDigitCharacters('', [0, 0])).toEqual([0, 0]);
    });

    it('returns the original selection when from/to are out of bounds (negative)', () => {
        expect(skipNonDigitCharacters('123', [-1, -1])).toEqual([-1, -1]);
    });

    it('returns the original selection when from/to are out of bounds (too large)', () => {
        expect(skipNonDigitCharacters('123', [5, 5])).toEqual([5, 5]);
    });

    it('returns the original selection when preceded by a digit but cursor is on a digit', () => {
        expect(skipNonDigitCharacters('0513', [2, 2])).toEqual([2, 2]);
    });

    it('returns the original selection when previous character is not a digit', () => {
        expect(skipNonDigitCharacters('AA/12', [2, 2])).toEqual([2, 2]);
    });

    it('returns the original selection when non-digit character is preceded by another non-digit character', () => {
        expect(skipNonDigitCharacters('05//13', [3, 3])).toEqual([3, 3]);
    });

    it('shifts past a single non-digit character when preceded by a digit', () => {
        expect(skipNonDigitCharacters('05/13/2026', [2, 2])).toEqual([3, 3]);
    });

    it('shifts past multiple consecutive non-digit characters', () => {
        expect(skipNonDigitCharacters('05/13/2026, 10:25', [10, 10])).toEqual([12, 12]);
    });

    it('shifts past time segment separator', () => {
        expect(skipNonDigitCharacters('05/13/2026, 10:25', [14, 14])).toEqual([15, 15]);
    });

    it('shifts to the end when value ends with non-digit characters', () => {
        expect(skipNonDigitCharacters('123abc', [3, 3])).toEqual([6, 6]);
    });

    it('shifts past whitespace characters when they are preceded by a digit', () => {
        expect(skipNonDigitCharacters('1\t\t2', [1, 1])).toEqual([3, 3]);
    });

    it('treats any non-digit character after a digit as skippable', () => {
        expect(skipNonDigitCharacters('12ABC34', [2, 2])).toEqual([5, 5]);
    });
});
