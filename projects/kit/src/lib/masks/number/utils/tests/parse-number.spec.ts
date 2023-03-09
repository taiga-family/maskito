import {maskitoParseNumber} from '../parse-number';

describe('maskitoParseNumber', () => {
    describe('decimal separator is dot (default one)', () => {
        it('thousand separator is space', () => {
            expect(maskitoParseNumber('1 000 000.42')).toBe(1000000.42);
        });

        it('thousand separator is hyphen', () => {
            expect(maskitoParseNumber('1-000-000.42')).toBe(1000000.42);
        });

        it('thousand separator is empty string', () => {
            expect(maskitoParseNumber('1000000.42')).toBe(1000000.42);
        });

        it('empty decimal part & thousand separator is comma', () => {
            expect(maskitoParseNumber('1,000,000')).toBe(1000000);
        });
    });

    describe('decimal separator is comma', () => {
        it('thousand separator is space', () => {
            expect(maskitoParseNumber('42 111,42', ',')).toBe(42111.42);
        });

        it('thousand separator is hyphen', () => {
            expect(maskitoParseNumber('42-111,42', ',')).toBe(42111.42);
        });

        it('thousand separator is empty string', () => {
            expect(maskitoParseNumber('42111,42', ',')).toBe(42111.42);
        });

        it('empty decimal part & thousand separator is dot', () => {
            expect(maskitoParseNumber('42.111', ',')).toBe(42111);
        });
    });
});
