import {describe, expect, it} from '@jest/globals';

import {
    CHAR_EM_DASH,
    CHAR_EN_DASH,
    CHAR_HYPHEN,
    CHAR_JP_HYPHEN,
    CHAR_MINUS,
} from '../../../../constants';
import type {MaskitoNumberParams} from '../../number-params';
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

        it('thousand separator is point & maximumFractionDigits is unset (default `0`) & decimal separator is unset (default point)', () => {
            expect(maskitoParseNumber('123.456.789', {thousandSeparator: '.'})).toBe(
                123456789,
            );
        });

        it('empty decimal part & thousand separator is comma', () => {
            expect(maskitoParseNumber('1,000,000')).toBe(1000000);
        });

        it('trailing decimal separator', () => {
            expect(maskitoParseNumber('0.')).toBe(0);
        });
    });

    describe('decimal separator is comma', () => {
        it('thousand separator is space', () => {
            expect(maskitoParseNumber('42 111,42', {decimalSeparator: ','})).toBe(
                42111.42,
            );
        });

        it('thousand separator is hyphen', () => {
            expect(maskitoParseNumber('42-111,42', {decimalSeparator: ','})).toBe(
                42111.42,
            );
        });

        it('thousand separator is empty string', () => {
            expect(maskitoParseNumber('42111,42', {decimalSeparator: ','})).toBe(
                42111.42,
            );
        });

        it('empty decimal part & thousand separator is dot', () => {
            expect(maskitoParseNumber('42.111', {decimalSeparator: ','})).toBe(42111);
        });

        it('trailing decimal separator', () => {
            expect(maskitoParseNumber('42,', {decimalSeparator: ','})).toBe(42);
        });
    });

    describe('decimal separator is empty string', () => {
        it('thousand separator is point', () => {
            expect(maskitoParseNumber('123.456.789', {decimalSeparator: ''})).toBe(
                123456789,
            );
        });

        it('thousand separator is empty string', () => {
            expect(maskitoParseNumber('123456', {decimalSeparator: ''})).toBe(123456);
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

            it('can be katakana-hiragana prolonged sound mark', () => {
                expect(maskitoParseNumber(`${CHAR_JP_HYPHEN}42`)).toBe(-42);
            });

            it('can be any custom character', () => {
                expect(maskitoParseNumber('x42', {minusSign: 'x'})).toBe(-42);
                expect(maskitoParseNumber('!42', {minusSign: '!'})).toBe(-42);
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

        it('parses negative number with prefix', () => {
            expect(maskitoParseNumber('>-42')).toBe(-42);
            expect(maskitoParseNumber('> -42')).toBe(-42);
        });

        describe('prefix/postfix includes point and space', () => {
            it('parses INTEGER number with postfix " lbs."', () => {
                expect(maskitoParseNumber('42 lbs.')).toBe(42);
                expect(maskitoParseNumber('1 000 lbs.')).toBe(1000);
                expect(maskitoParseNumber('1 000 lbs.')).toBe(1000);
            });

            it('parses DECIMAL number with postfix " lbs."', () => {
                expect(maskitoParseNumber('0.42 lbs.')).toBe(0.42);
                expect(maskitoParseNumber('.42 lbs.')).toBe(0.42);
                expect(maskitoParseNumber('1 000.42 lbs.')).toBe(1000.42);
                expect(maskitoParseNumber('1 000. lbs.')).toBe(1000);
            });

            it('parses INTEGER number with prefix "lbs. "', () => {
                expect(maskitoParseNumber('lbs. 42')).toBe(42);
                expect(maskitoParseNumber('lbs. 1 000')).toBe(1000);
                expect(maskitoParseNumber('lbs. 1 000')).toBe(1000);
            });

            it('parses DECIMAL number with prefix "lbs. "', () => {
                expect(maskitoParseNumber('lbs. 0.42')).toBe(0.42);
                expect(maskitoParseNumber('lbs. .42')).toBe(0.42);
                expect(maskitoParseNumber('lbs. 1 000.42')).toBe(1000.42);
                expect(maskitoParseNumber('lbs. 1 000.42')).toBe(1000.42);

                const zeroWidthSpace = '\u200B';

                expect(maskitoParseNumber(`lbs.${zeroWidthSpace}1 000.42`)).toBe(1000.42);
            });
        });
    });

    describe('BigInt mode', () => {
        it('parses large positive integer as BigInt', () => {
            expect(
                maskitoParseNumber('987.654.321.098.765.432.100', {
                    thousandSeparator: '.',
                    bigint: true,
                }),
            ).toEqual(BigInt('987654321098765432100'));
        });

        it('parses large negative integer as BigInt', () => {
            expect(
                maskitoParseNumber('-123 456 789 012 345 678 900', {
                    thousandSeparator: ' ',
                    bigint: Boolean('ALWAYS true, but boolean for TS'),
                }),
            ).toBe(-123456789012345678900n);
        });

        it('throws native error on attempt to use {bigint: true} with decimal number', () => {
            expect(() =>
                maskitoParseNumber('1_234.56', {
                    thousandSeparator: '_',
                    bigint: true,
                }),
            ).toThrow('Cannot convert 1234.56 to a BigInt');
        });

        describe('TypeScript overloads', () => {
            type Expect<T extends true> = T;

            type IsEqual<T, U> =
                (<G>() => G extends T ? 1 : 2) extends <G>() => G extends U ? 1 : 2
                    ? true
                    : false;

            it('returns `number` when `bigint` is unset', () => {
                const result = maskitoParseNumber('42');
                const TRUE: Expect<IsEqual<typeof result, number>> = true;

                expect(typeof result === 'number').toBe(TRUE);
            });

            it('returns `number` when `bigint` is explicitly set to `false`', () => {
                const result = maskitoParseNumber('42', {bigint: false});
                const TRUE: Expect<IsEqual<typeof result, number>> = true;

                expect(typeof result === 'number').toBe(TRUE);
            });

            it('returns `bigint` when `bigint` is explicitly set to `true`', () => {
                const result = maskitoParseNumber('42', {bigint: true});
                const TRUE: Expect<IsEqual<typeof result, bigint>> = true;

                expect(typeof result === 'bigint').toBe(TRUE);
            });

            it('returns `bigint | number` when `bigint` is computed dynamically', () => {
                const result = maskitoParseNumber('42', {bigint: Boolean(1)});
                const TRUE: Expect<IsEqual<typeof result, bigint | number>> = true;

                expect(typeof result === 'bigint').toBe(TRUE);
            });
        });
    });

    describe('Minus is positioned before prefix', () => {
        const params: MaskitoNumberParams = {
            decimalSeparator: '.',
            minusSign: CHAR_MINUS,
            minusPseudoSigns: [
                CHAR_MINUS,
                CHAR_HYPHEN,
                CHAR_EN_DASH,
                CHAR_EM_DASH,
                CHAR_JP_HYPHEN,
            ],
            // Even without knowing `prefix` / `maximumFractionDigits` values `maskitoParseNumber` is capable to parse number
        };

        it('-$42 (with leading minus character)', () => {
            expect(maskitoParseNumber(`${CHAR_MINUS}$42`, params)).toBe(-42);
        });

        describe('pseudo minuses', () => {
            [CHAR_MINUS, CHAR_HYPHEN, CHAR_EN_DASH, CHAR_EM_DASH, CHAR_JP_HYPHEN].forEach(
                (pseudoMinus) => {
                    it(`${pseudoMinus}$42`, () => {
                        expect(maskitoParseNumber(`${pseudoMinus}$42`, params)).toBe(-42);
                    });
                },
            );
        });

        it('-$0.42', () => {
            expect(maskitoParseNumber(`${CHAR_MINUS}$0.42`, params)).toBe(-0.42);
        });

        it('-$.42', () => {
            expect(maskitoParseNumber('-$.42', params)).toBe(-0.42);
        });

        it('-$0', () => {
            expect(maskitoParseNumber('-$0', params)).toBe(-0);
        });

        it('-$', () => {
            expect(maskitoParseNumber(`${CHAR_MINUS}$`, params)).toBeNaN();
        });
    });

    describe('NaN', () => {
        it('empty string => NaN', () => {
            expect(maskitoParseNumber('')).toBeNaN();
        });

        it('decimal separator only => NaN', () => {
            expect(maskitoParseNumber('.')).toBeNaN();
            expect(maskitoParseNumber(',', {decimalSeparator: ','})).toBeNaN();
        });

        it('negative sign only => NaN', () => {
            expect(maskitoParseNumber(CHAR_MINUS)).toBeNaN();
            expect(maskitoParseNumber(CHAR_HYPHEN)).toBeNaN();
            expect(maskitoParseNumber(CHAR_EN_DASH)).toBeNaN();
            expect(maskitoParseNumber(CHAR_EM_DASH)).toBeNaN();
        });
    });
});
