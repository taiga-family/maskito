import {
    CHAR_EM_DASH,
    CHAR_EN_DASH,
    CHAR_HYPHEN,
    CHAR_JP_HYPHEN,
    CHAR_MINUS,
} from '../../../../constants';
import {toNumberParts} from '../to-number-parts';

describe('toNumberParts', () => {
    [',', '.'].forEach(decimalSeparator => {
        describe(`decimalSeparator = ${decimalSeparator}`, () => {
            it('empty string => empty parts', () => {
                expect(toNumberParts('', decimalSeparator)).toEqual({
                    minus: '',
                    integerPart: '',
                    decimalPart: '',
                });
            });

            it(`123${decimalSeparator}45 => {minus: "", integerPart: "123", decimalPart: "45"}`, () => {
                expect(
                    toNumberParts(`123${decimalSeparator}45`, decimalSeparator),
                ).toEqual({
                    minus: '',
                    integerPart: '123',
                    decimalPart: '45',
                });
            });

            it(`-123${decimalSeparator}45 => {minus: "-", integerPart: "123", decimalPart: "45"}`, () => {
                expect(
                    toNumberParts(`-123${decimalSeparator}45`, decimalSeparator),
                ).toEqual({
                    minus: '-',
                    integerPart: '123',
                    decimalPart: '45',
                });
            });

            it('123 => {minus: "", integerPart: "123", decimalPart: ""}', () => {
                expect(toNumberParts('123', decimalSeparator)).toEqual({
                    minus: '',
                    integerPart: '123',
                    decimalPart: '',
                });
            });

            it('-123 => {minus: "-", integerPart: "123", decimalPart: ""}', () => {
                expect(toNumberParts('-123', decimalSeparator)).toEqual({
                    minus: '-',
                    integerPart: '123',
                    decimalPart: '',
                });
            });

            it(`${decimalSeparator}45 => {minus: "", integerPart: "", decimalPart: "45"}`, () => {
                expect(toNumberParts(`${decimalSeparator}45`, decimalSeparator)).toEqual({
                    minus: '',
                    integerPart: '',
                    decimalPart: '45',
                });
            });

            it(`-${decimalSeparator}45 => {minus: "-", integerPart: "", decimalPart: "45"}`, () => {
                expect(toNumberParts(`-${decimalSeparator}45`, decimalSeparator)).toEqual(
                    {
                        minus: '-',
                        integerPart: '',
                        decimalPart: '45',
                    },
                );
            });

            it('- => {minus: "-", integerPart: "", decimalPart: ""}', () => {
                expect(toNumberParts('-', decimalSeparator)).toEqual({
                    minus: '-',
                    integerPart: '',
                    decimalPart: '',
                });
            });
        });
    });

    it('different minus signs', () => {
        [CHAR_MINUS, CHAR_HYPHEN, CHAR_EN_DASH, CHAR_EM_DASH, CHAR_JP_HYPHEN].forEach(
            minus => {
                expect(toNumberParts(`${minus}123.45`, '.')).toEqual({
                    minus,
                    integerPart: '123',
                    decimalPart: '45',
                });
            },
        );
    });
});
