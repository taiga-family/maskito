import {CHAR_EM_DASH, CHAR_EN_DASH, CHAR_HYPHEN, CHAR_MINUS} from '../../../../constants';
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

    describe('negative numbers', () => {
        describe('minus sign', () => {
            it('can be minus', () => {
                expect(maskitoParseNumber(`${CHAR_MINUS}1`)).toBe(-1);
            });

            it('can be hyphen', () => {
                expect(maskitoParseNumber(`${CHAR_HYPHEN}123 456`)).toBe(-123456);
            });

            it('can be en-dash', () => {
                expect(maskitoParseNumber(`${CHAR_EN_DASH}123 456 789`)).toBe(-123456789);
            });

            it('can be em-dash', () => {
                expect(maskitoParseNumber(`${CHAR_EM_DASH}42`)).toBe(-42);
            });
        });

        it('parses negative integer number when thousand separator is hyphen & minus sign is hyphen', () => {
            expect(maskitoParseNumber('-123-456')).toBe(-123456);
        });

        it('parses negative number with decimal part', () => {
            expect(maskitoParseNumber('-123.456')).toBe(-123.456);
        });
    });

    describe('Prefix & Postfix', () => {
        it('parses number with only prefix', () => {
            expect(maskitoParseNumber('$42')).toBe(42);
        });

        it('parses number with only postfix', () => {
            expect(maskitoParseNumber('42%')).toBe(42);
        });

        it('parses number with both prefix and postfix', () => {
            expect(maskitoParseNumber('$42 per day')).toBe(42);
        });
    });
});
