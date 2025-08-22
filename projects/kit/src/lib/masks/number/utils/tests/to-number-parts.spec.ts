import {describe, expect, it} from '@jest/globals';
import type {MaskitoNumberParams} from '@maskito/kit';

import {
    CHAR_EM_DASH,
    CHAR_EN_DASH,
    CHAR_HYPHEN,
    CHAR_JP_HYPHEN,
    CHAR_MINUS,
} from '../../../../constants';
import {toNumberParts} from '../number-parts';

const DEFAULT_PARAMS = {
    prefix: '',
    postfix: '',
    minusPseudoSigns: [],
    decimalSeparator: '.',
    minusSign: '-',
    decimalPseudoSeparators: [','] as string[], // TODO(v4): remove `as string[]`
} as const satisfies MaskitoNumberParams;

describe('toNumberParts', () => {
    [',', '.'].forEach((decimalSeparator) => {
        describe(`decimalSeparator = ${decimalSeparator}`, () => {
            const params = {
                ...DEFAULT_PARAMS,
                minusSign: '-',
                decimalSeparator,
            } as const satisfies MaskitoNumberParams;

            it('empty string => empty parts', () => {
                expect(toNumberParts('', params)).toEqual({
                    minus: '',
                    integerPart: '',
                    decimalPart: '',
                    decimalSeparator: '',
                    prefix: '',
                    postfix: '',
                });
            });

            it(`123${decimalSeparator}45 => {minus: "", integerPart: "123", decimalPart: "45"}`, () => {
                expect(toNumberParts(`123${decimalSeparator}45`, params)).toEqual({
                    minus: '',
                    integerPart: '123',
                    decimalPart: '45',
                    decimalSeparator,
                    prefix: '',
                    postfix: '',
                });
            });

            it(`-123${decimalSeparator}45 => {minus: "-", integerPart: "123", decimalPart: "45"}`, () => {
                expect(toNumberParts(`-123${decimalSeparator}45`, params)).toEqual({
                    minus: '-',
                    integerPart: '123',
                    decimalPart: '45',
                    decimalSeparator,
                    prefix: '',
                    postfix: '',
                });
            });

            it('123 => {minus: "", integerPart: "123", decimalPart: ""}', () => {
                expect(toNumberParts('123', params)).toEqual({
                    minus: '',
                    integerPart: '123',
                    decimalPart: '',
                    decimalSeparator: '',
                    prefix: '',
                    postfix: '',
                });
            });

            it('-123 => {minus: "-", integerPart: "123", decimalPart: ""}', () => {
                expect(toNumberParts('-123', params)).toEqual({
                    minus: '-',
                    integerPart: '123',
                    decimalPart: '',
                    decimalSeparator: '',
                    prefix: '',
                    postfix: '',
                });
            });

            it(`${decimalSeparator}45 => {minus: "", integerPart: "", decimalPart: "45"}`, () => {
                expect(toNumberParts(`${decimalSeparator}45`, params)).toEqual({
                    minus: '',
                    integerPart: '',
                    decimalPart: '45',
                    decimalSeparator,
                    prefix: '',
                    postfix: '',
                });
            });

            it(`-${decimalSeparator}45 => {minus: "-", integerPart: "", decimalPart: "45"}`, () => {
                expect(toNumberParts(`-${decimalSeparator}45`, params)).toEqual({
                    minus: '-',
                    integerPart: '',
                    decimalPart: '45',
                    decimalSeparator,
                    prefix: '',
                    postfix: '',
                });
            });

            it('- => {minus: "-", integerPart: "", decimalPart: ""}', () => {
                expect(toNumberParts('-', params)).toEqual({
                    minus: '-',
                    integerPart: '',
                    decimalPart: '',
                    decimalSeparator: '',
                    prefix: '',
                    postfix: '',
                });
            });
        });
    });

    describe('different minus signs', () => {
        [CHAR_MINUS, CHAR_HYPHEN, CHAR_EN_DASH, CHAR_EM_DASH, CHAR_JP_HYPHEN].forEach(
            (minus) => {
                const params = {
                    ...DEFAULT_PARAMS,
                    minusSign: minus,
                    decimalSeparator: '.',
                    decimalPseudoSeparators: ['б'] as string[], // TODO(v4): delete `as string[]`
                    thousandSeparator: ',',
                } as const satisfies MaskitoNumberParams;

                it(`${minus}`, () => {
                    expect(toNumberParts(`${minus}1,234,567.89`, params)).toEqual({
                        minus,
                        integerPart: '1,234,567',
                        decimalPart: '89',
                        decimalSeparator: '.',
                        prefix: '',
                        postfix: '',
                    });
                });
            },
        );
    });

    describe('thousand separator (e.g. underscore) is a part of integer', () => {
        const thousandSeparator = '_';

        const params = {
            ...DEFAULT_PARAMS,
            minusSign: '-',
            thousandSeparator,
            decimalSeparator: '.',
        } as const satisfies MaskitoNumberParams;

        it('only thousand separator sign', () => {
            expect(toNumberParts(thousandSeparator, params)).toEqual({
                minus: '',
                integerPart: '_',
                decimalPart: '',
                decimalSeparator: '',
                prefix: '',
                postfix: '',
            });
        });

        it('only minus and thousand separator signs', () => {
            expect(toNumberParts(`-${thousandSeparator}`, params)).toEqual({
                minus: '-',
                integerPart: thousandSeparator,
                decimalPart: '',
                decimalSeparator: '',
                prefix: '',
                postfix: '',
            });
        });

        it(`-1${thousandSeparator}234.45 => {minus: "-", integerPart: "1${thousandSeparator}234", decimalPart: "45"}`, () => {
            expect(toNumberParts(`-1${thousandSeparator}234.45`, params)).toEqual({
                minus: '-',
                integerPart: `1${thousandSeparator}234`,
                decimalPart: '45',
                decimalSeparator: '.',
                prefix: '',
                postfix: '',
            });
        });

        it(`-${thousandSeparator}234.45 => {minus: "-", integerPart: "${thousandSeparator}234", decimalPart: "45"}`, () => {
            expect(toNumberParts(`-${thousandSeparator}234.45`, params)).toEqual({
                minus: '-',
                integerPart: `${thousandSeparator}234`,
                decimalPart: '45',
                decimalSeparator: '.',
                prefix: '',
                postfix: '',
            });
        });
    });

    describe('multi-character affixes', () => {
        describe('prefix = EUR', () => {
            const params = {
                ...DEFAULT_PARAMS,
                prefix: 'EUR',
            } as const satisfies MaskitoNumberParams;

            ['E', 'U', 'R'].forEach((char) => {
                it(`type single character ${char}`, () => {
                    expect(toNumberParts(char, params)).toEqual({
                        minus: '',
                        integerPart: '',
                        decimalPart: '',
                        decimalSeparator: '',
                        prefix: char,
                        postfix: '',
                    });
                });
            });
        });

        describe('postfix = руб.', () => {
            const params = {
                ...DEFAULT_PARAMS,
                postfix: 'руб.', // ends with point!
                decimalSeparator: '.', // point too!
                maximumFractionDigits: 2,
            } as const satisfies MaskitoNumberParams;

            ['р', 'у', 'б'].forEach((char) => {
                it(`type 1 + single character ${char}`, () => {
                    expect(toNumberParts(`1${char}`, params)).toEqual({
                        minus: '',
                        integerPart: '1',
                        decimalPart: '',
                        decimalSeparator: '',
                        prefix: '',
                        postfix: char,
                    });
                });
            });

            it('type 1 + point', () => {
                expect(toNumberParts('1.', params)).toEqual({
                    minus: '',
                    integerPart: '1',
                    decimalPart: '',
                    decimalSeparator: '.',
                    prefix: '',
                    postfix: '',
                });
            });

            it('100руб.', () => {
                expect(toNumberParts('100руб.', params)).toEqual({
                    minus: '',
                    integerPart: '100',
                    decimalPart: '',
                    decimalSeparator: '',
                    prefix: '',
                    postfix: 'руб.',
                });
            });
        });
    });

    it('prefix ends with point & value starts with decimal point too', () => {
        expect(
            toNumberParts('.42', {
                ...DEFAULT_PARAMS,
                decimalSeparator: '.',
                prefix: 'lbs.',
            }),
        ).toEqual({
            minus: '',
            integerPart: '',
            decimalPart: '42',
            decimalSeparator: '.',
            prefix: '',
            postfix: '',
        });
    });
});
