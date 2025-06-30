import {describe, expect, it} from '@jest/globals';

import {
    CHAR_EM_DASH,
    CHAR_EN_DASH,
    CHAR_HYPHEN,
    CHAR_JP_HYPHEN,
    CHAR_MINUS,
} from '../../../../constants';
import {toNumberParts} from '../to-number-parts';

describe('toNumberParts', () => {
    [',', '.'].forEach((decimalSeparator) => {
        describe(`decimalSeparator = ${decimalSeparator}`, () => {
            const minusSign = '-';

            it('empty string => empty parts', () => {
                expect(toNumberParts('', {decimalSeparator, minusSign})).toEqual({
                    minus: '',
                    integerPart: '',
                    decimalPart: '',
                });
            });

            it(`123${decimalSeparator}45 => {minus: "", integerPart: "123", decimalPart: "45"}`, () => {
                expect(
                    toNumberParts(`123${decimalSeparator}45`, {
                        decimalSeparator,
                        minusSign,
                    }),
                ).toEqual({
                    minus: '',
                    integerPart: '123',
                    decimalPart: '45',
                });
            });

            it(`-123${decimalSeparator}45 => {minus: "-", integerPart: "123", decimalPart: "45"}`, () => {
                expect(
                    toNumberParts(`-123${decimalSeparator}45`, {
                        decimalSeparator,
                        minusSign,
                    }),
                ).toEqual({
                    minus: '-',
                    integerPart: '123',
                    decimalPart: '45',
                });
            });

            it('123 => {minus: "", integerPart: "123", decimalPart: ""}', () => {
                expect(toNumberParts('123', {decimalSeparator, minusSign})).toEqual({
                    minus: '',
                    integerPart: '123',
                    decimalPart: '',
                });
            });

            it('-123 => {minus: "-", integerPart: "123", decimalPart: ""}', () => {
                expect(toNumberParts('-123', {decimalSeparator, minusSign})).toEqual({
                    minus: '-',
                    integerPart: '123',
                    decimalPart: '',
                });
            });

            it(`${decimalSeparator}45 => {minus: "", integerPart: "", decimalPart: "45"}`, () => {
                expect(
                    toNumberParts(`${decimalSeparator}45`, {
                        decimalSeparator,
                        minusSign,
                    }),
                ).toEqual({
                    minus: '',
                    integerPart: '',
                    decimalPart: '45',
                });
            });

            it(`-${decimalSeparator}45 => {minus: "-", integerPart: "", decimalPart: "45"}`, () => {
                expect(
                    toNumberParts(`-${decimalSeparator}45`, {
                        decimalSeparator,
                        minusSign,
                    }),
                ).toEqual({
                    minus: '-',
                    integerPart: '',
                    decimalPart: '45',
                });
            });

            it('- => {minus: "-", integerPart: "", decimalPart: ""}', () => {
                expect(toNumberParts('-', {decimalSeparator, minusSign})).toEqual({
                    minus: '-',
                    integerPart: '',
                    decimalPart: '',
                });
            });
        });
    });

    describe('different minus signs', () => {
        [CHAR_MINUS, CHAR_HYPHEN, CHAR_EN_DASH, CHAR_EM_DASH, CHAR_JP_HYPHEN].forEach(
            (minus) => {
                it(`${minus}`, () => {
                    expect(
                        toNumberParts(`${minus}1,234,567.89`, {
                            decimalSeparator: '.',
                            minusSign: minus,
                        }),
                    ).toEqual({
                        minus,
                        integerPart: '1,234,567',
                        decimalPart: '89',
                    });
                });
            },
        );
    });

    describe('thousand separator (e.g. underscore) is a part of integer', () => {
        const thousandSeparator = '_';
        const decimalSeparator = '.';

        it('only thousand separator sign', () => {
            expect(
                toNumberParts(thousandSeparator, {decimalSeparator, minusSign: '-'}),
            ).toEqual({
                minus: '',
                integerPart: '',
                decimalPart: '',
            });
        });

        it('only minus and thousand separator signs', () => {
            expect(
                toNumberParts(`-${thousandSeparator}`, {
                    decimalSeparator,
                    minusSign: '-',
                }),
            ).toEqual({
                minus: '-',
                integerPart: thousandSeparator,
                decimalPart: '',
            });
        });

        it(`-1${thousandSeparator}234.45 => {minus: "-", integerPart: "1${thousandSeparator}234", decimalPart: "45"}`, () => {
            expect(
                toNumberParts(`-1${thousandSeparator}234.45`, {
                    decimalSeparator,
                    minusSign: '-',
                }),
            ).toEqual({
                minus: '-',
                integerPart: `1${thousandSeparator}234`,
                decimalPart: '45',
            });
        });

        it(`-${thousandSeparator}234.45 => {minus: "-", integerPart: "${thousandSeparator}234", decimalPart: "45"}`, () => {
            expect(
                toNumberParts(`-${thousandSeparator}234.45`, {
                    decimalSeparator,
                    minusSign: '-',
                }),
            ).toEqual({
                minus: '-',
                integerPart: `${thousandSeparator}234`,
                decimalPart: '45',
            });
        });
    });
});
