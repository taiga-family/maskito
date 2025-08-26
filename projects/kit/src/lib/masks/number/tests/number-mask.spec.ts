import {beforeEach, describe, expect, it} from '@jest/globals';
import type {MaskitoOptions} from '@maskito/core';
import {MASKITO_DEFAULT_OPTIONS, maskitoTransform} from '@maskito/core';
import {maskitoParseNumber} from '@maskito/kit';

import {
    CHAR_EM_DASH,
    CHAR_EN_DASH,
    CHAR_HYPHEN,
    CHAR_JP_HYPHEN,
    CHAR_MINUS,
    CHAR_NO_BREAK_SPACE,
    CHAR_ZERO_WIDTH_SPACE,
} from '../../../constants';
import {maskitoNumberOptionsGenerator} from '../number-mask';

describe('Number (maskitoTransform)', () => {
    describe('`maximumFractionDigits` is `0`', () => {
        let options: MaskitoOptions = MASKITO_DEFAULT_OPTIONS;

        beforeEach(() => {
            options = maskitoNumberOptionsGenerator({
                decimalSeparator: ',',
                decimalPseudoSeparators: ['.'],
                maximumFractionDigits: 0,
            });
        });

        it('drops decimal part (123,45)', () => {
            expect(maskitoTransform('123,45', options)).toBe('123');
        });

        it('drops decimal part (123.45)', () => {
            expect(maskitoTransform('123.45', options)).toBe('123');
        });

        it('keeps minus sign (-123)', () => {
            expect(maskitoTransform('-123', options)).toBe('−123');
        });
    });

    describe('`thousandSeparator` is equal to the item from `decimalPseudoSeparators`', () => {
        let options: MaskitoOptions = MASKITO_DEFAULT_OPTIONS;

        beforeEach(() => {
            options = maskitoNumberOptionsGenerator({
                decimalSeparator: ',',
                decimalPseudoSeparators: ['.', ','],
                thousandSeparator: '.',
                maximumFractionDigits: 2,
            });
        });

        it('replace space to dot (121.321)', () => {
            expect(maskitoTransform('121 321', options)).toBe('121.321');
        });

        it('should`t have changes (121.321)', () => {
            expect(maskitoTransform('121.321', options)).toBe('121.321');
        });

        it('drops last symbol in decimal part (120,45)', () => {
            expect(maskitoTransform('120,450', options)).toBe('120,45');
        });

        it('keeps minus sign (-123.434) and replace space to dot', () => {
            expect(maskitoTransform('−120 343', options)).toBe('−120.343');
        });
    });

    it('should accept simple and non-breaking spaces as interchangeable characters for [thousandSeparator]', () => {
        const options = maskitoNumberOptionsGenerator({
            postfix: ' $',
            thousandSeparator: ' ',
        });

        expect(maskitoTransform('45 001 $', options)).toBe('45 001 $'); // initialization phase
        expect(maskitoTransform('45 001 $', options)).toBe('45 001 $'); // next user interaction
    });

    describe('`thousandSeparator` is equal to the item from `decimalPseudoSeparators` with zero padding', () => {
        let options: MaskitoOptions = MASKITO_DEFAULT_OPTIONS;

        beforeEach(() => {
            options = maskitoNumberOptionsGenerator({
                decimalSeparator: ',',
                thousandSeparator: '.',
                decimalPseudoSeparators: ['.', ','],
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
            });
        });

        it('add dots and decimals (21.121.321,00)', () => {
            expect(maskitoTransform('21121321', options)).toBe('21.121.321,00');
        });
    });

    describe('`postfix` contains point and space (` lbs.`)', () => {
        let options: MaskitoOptions = MASKITO_DEFAULT_OPTIONS;

        describe('maximumFractionDigits: 2', () => {
            beforeEach(() => {
                options = maskitoNumberOptionsGenerator({
                    postfix: ' lbs.',
                    maximumFractionDigits: 2,
                });
            });

            it('empty textfield => empty textfield', () => {
                expect(maskitoTransform('', options)).toBe('');
            });

            it('only postfix => Only postfix', () => {
                expect(maskitoTransform(' lbs.', options)).toBe(' lbs.');
            });

            it('5 => 5 lbs.', () => {
                expect(maskitoTransform('5', options)).toBe('5 lbs.');
            });

            it('0.42 => 0.42 lbs.', () => {
                expect(maskitoTransform('0.42', options)).toBe('0.42 lbs.');
            });

            it('1 000 => 1 000 lbs.', () => {
                expect(maskitoTransform('1 000', options)).toBe('1 000 lbs.');
            });

            it('1 000. => 1 000. lbs.', () => {
                expect(maskitoTransform('1 000.', options)).toBe('1 000. lbs.');
            });

            it('paste 1 000<space> => 1 000. |lbs.', () => {
                expect(
                    maskitoTransform(
                        {value: '1 000 ', selection: ['1 000 '.length, '1 000 '.length]},
                        options,
                    ),
                ).toEqual({
                    value: '1 000 lbs.',
                    selection: ['1 000 '.length, '1 000 '.length],
                });
            });

            it('1 000 lbs. => 1 000 lbs.', () => {
                expect(maskitoTransform('1 000 lbs.', options)).toBe('1 000 lbs.');
            });
        });

        describe('maximumFractionDigits: 0', () => {
            beforeEach(() => {
                options = maskitoNumberOptionsGenerator({
                    postfix: ' lbs.',
                    maximumFractionDigits: 0,
                });
            });

            it('empty textfield => empty textfield', () => {
                expect(maskitoTransform('', options)).toBe('');
            });

            it('only postfix => Only postfix', () => {
                expect(maskitoTransform(' lbs.', options)).toBe(' lbs.');
            });

            it('5 => 5 lbs.', () => {
                expect(maskitoTransform('5', options)).toBe('5 lbs.');
            });

            it('0.42 => 0 lbs.', () => {
                expect(maskitoTransform('0.42', options)).toBe('0 lbs.');
            });

            it('1 000 => 1 000 lbs.', () => {
                expect(maskitoTransform('1 000', options)).toBe('1 000 lbs.');
            });

            it('1 000. => 1 000 lbs.', () => {
                expect(maskitoTransform('1 000.', options)).toBe('1 000 lbs.');
            });

            it('1 000 lbs. => 1 000 lbs.', () => {
                expect(maskitoTransform('1 000 lbs.', options)).toBe('1 000 lbs.');
            });
        });
    });

    describe('`prefix` contains point and space (`lbs. `)', () => {
        let options: MaskitoOptions = MASKITO_DEFAULT_OPTIONS;

        describe('maximumFractionDigits: 2', () => {
            beforeEach(() => {
                options = maskitoNumberOptionsGenerator({
                    prefix: 'lbs. ',
                    maximumFractionDigits: 2,
                });
            });

            it('empty textfield => empty textfield', () => {
                expect(maskitoTransform('', options)).toBe('');
            });

            it('only prefix => Only prefix', () => {
                expect(maskitoTransform('lbs. ', options)).toBe('lbs. ');
            });

            it('5 => lbs. 5', () => {
                expect(maskitoTransform('5', options)).toBe('lbs. 5');
            });

            it('0.42 => lbs. 0.42', () => {
                expect(maskitoTransform('0.42', options)).toBe('lbs. 0.42');
            });

            it('1 000 => lbs. 1 000', () => {
                expect(maskitoTransform('1 000', options)).toBe('lbs. 1 000');
            });

            it('1 000. => lbs. 1 000', () => {
                expect(maskitoTransform('1 000.', options)).toBe('lbs. 1 000.');
            });

            it('lbs. 1 000  => lbs. 1 000', () => {
                expect(maskitoTransform('lbs. 1 000', options)).toBe('lbs. 1 000');
            });
        });

        describe('maximumFractionDigits: 0', () => {
            beforeEach(() => {
                options = maskitoNumberOptionsGenerator({
                    prefix: 'lbs. ',
                    maximumFractionDigits: 0,
                });
            });

            it('empty textfield => empty textfield', () => {
                expect(maskitoTransform('', options)).toBe('');
            });

            it('only prefix => Only prefix', () => {
                expect(maskitoTransform('lbs. ', options)).toBe('lbs. ');
            });

            it('5 => lbs. 5', () => {
                expect(maskitoTransform('5', options)).toBe('lbs. 5');
            });

            it('0.42 => lbs. 0', () => {
                expect(maskitoTransform('0.42', options)).toBe('lbs. 0');
            });

            it('1 000 => lbs. 1 000', () => {
                expect(maskitoTransform('1 000', options)).toBe('lbs. 1 000');
            });

            it('1 000. => lbs. 1 000', () => {
                expect(maskitoTransform('1 000.', options)).toBe('lbs. 1 000');
            });

            it('lbs. 1 000 => lbs. 1 000', () => {
                expect(maskitoTransform('lbs. 1 000', options)).toBe('lbs. 1 000');
            });
        });

        describe('prefix ends with same character as decimal separator equals (zero-width space workaround)', () => {
            beforeEach(() => {
                options = maskitoNumberOptionsGenerator({
                    prefix: 'lbs.',
                    decimalSeparator: '.',
                    maximumFractionDigits: 2,
                });
            });

            it('empty textfield => empty textfield', () => {
                expect(maskitoTransform('', options)).toBe('');
            });

            it('only prefix => prefix with zero-width space', () => {
                expect(maskitoTransform('lbs.', options)).toBe(
                    `lbs.${CHAR_ZERO_WIDTH_SPACE}`,
                );
            });

            it('5 => lbs.5', () => {
                expect(maskitoTransform('5', options)).toBe(
                    `lbs.${CHAR_ZERO_WIDTH_SPACE}5`,
                );
            });

            it('0.42 => lbs.0.42', () => {
                const expected = `lbs.${CHAR_ZERO_WIDTH_SPACE}0.42`;

                expect(maskitoTransform('0.42', options)).toBe(expected);
                expect(maskitoParseNumber(expected)).toBe(0.42);
            });

            it('42 => lbs.42', () => {
                const expected = `lbs.${CHAR_ZERO_WIDTH_SPACE}42`;

                expect(maskitoTransform('42', options)).toBe(expected);
                expect(maskitoParseNumber(expected)).toBe(42);
            });

            it('1 000 => lbs.1 000', () => {
                const expected = `lbs.${CHAR_ZERO_WIDTH_SPACE}1${CHAR_NO_BREAK_SPACE}000`;

                expect(maskitoTransform(`1${CHAR_NO_BREAK_SPACE}000`, options)).toBe(
                    expected,
                );
                expect(maskitoParseNumber(expected)).toBe(1000);
            });

            it('1 000. => lbs.1 000.', () => {
                const expected = `lbs.${CHAR_ZERO_WIDTH_SPACE}1${CHAR_NO_BREAK_SPACE}000.`;

                expect(maskitoTransform('1 000.', options)).toBe(expected);
                expect(maskitoParseNumber(expected)).toBe(1000);
            });
        });
    });

    describe('`prefix` is positioned after minus sign', () => {
        let options: MaskitoOptions = MASKITO_DEFAULT_OPTIONS;

        beforeEach(() => {
            options = maskitoNumberOptionsGenerator({
                prefix: '$',
                minusSign: '-',
                negativePattern: 'minusFirst',
                decimalSeparator: '.',
                maximumFractionDigits: 2,
            });
        });

        it('empty textfield => empty textfield', () => {
            expect(maskitoTransform('', options)).toBe('');
        });

        it('only minus sign => add prefix too', () => {
            expect(maskitoTransform('-', options)).toBe('-$');
        });

        it('minus + prefix', () => {
            expect(maskitoTransform('-$', options)).toBe('-$');
        });

        it('-123 => -$123', () => {
            expect(maskitoTransform('-123', options)).toBe('-$123');
        });

        it('123 => $123', () => {
            expect(maskitoTransform('123', options)).toBe('$123');
        });

        it('-.42 => -$0.42', () => {
            expect(maskitoTransform('-.42', options)).toBe('-$.42');
        });
    });

    describe('should transform full width number to half width', () => {
        describe('at any time', () => {
            it('at the 1st time (after initialization)', () => {
                const options = maskitoNumberOptionsGenerator({
                    thousandSeparator: '_',
                });

                expect(maskitoTransform('１２３４５', options)).toBe('12_345');
            });

            it('at the 2nd time (after initialization)', () => {
                const options = maskitoNumberOptionsGenerator({
                    thousandSeparator: '_',
                });

                maskitoTransform('１２３４５', options);

                expect(maskitoTransform('１２３４５', options)).toBe('12_345');
            });
        });
    });

    describe('applies `minusSign` property correctly', () => {
        const minuses = [
            {value: CHAR_HYPHEN, name: 'hyphen'},
            {value: CHAR_MINUS, name: 'unicode minus sign'},
            {value: 'i', name: 'i'},
        ];

        const numbers = ['23', '321', '2 432'];

        const pseudoMinuses = [
            {value: CHAR_HYPHEN, name: 'hyphen'},
            {value: CHAR_EN_DASH, name: 'en-dash'},
            {value: CHAR_EM_DASH, name: 'em-dash'},
            {value: CHAR_JP_HYPHEN, name: 'japanese prolonged sound mark'},
            {value: CHAR_MINUS, name: 'unicode minus sign'},
        ];

        minuses.forEach((minus) => {
            const options = maskitoNumberOptionsGenerator({
                minusSign: minus.value,
                thousandSeparator: ' ',
            });

            pseudoMinuses.forEach((pseudoMinus) => {
                numbers.forEach((number) => {
                    it(`transforms ${pseudoMinus.name} into ${minus.name}`, () => {
                        expect(
                            maskitoTransform(`${pseudoMinus.value}${number}`, options),
                        ).toBe(`${minus.value}${number}`);
                    });
                });
            });
        });
    });

    describe('custom minus should properly work with min(max) value', () => {
        let options = MASKITO_DEFAULT_OPTIONS;

        [
            {value: CHAR_HYPHEN, name: 'hyphen'},
            {value: CHAR_EN_DASH, name: 'en-dash'},
            {value: CHAR_EM_DASH, name: 'em-dash'},
            {value: CHAR_JP_HYPHEN, name: 'japanese prolonged sound mark'},
            {value: CHAR_MINUS, name: 'unicode minus sign'},
        ].forEach((minus) => {
            describe(`applies ${minus.name} properly`, () => {
                beforeEach(() => {
                    options = maskitoNumberOptionsGenerator({
                        min: -123,
                        minusSign: minus.value,
                    });
                });

                it(`-94 => ${minus.value}94`, () => {
                    expect(maskitoTransform(`${minus.value}94`, options)).toBe(
                        `${minus.value}94`,
                    );
                });

                it(`-432 => ${minus.value}123`, () => {
                    expect(maskitoTransform(`${minus.value}432`, options)).toBe(
                        `${minus.value}123`,
                    );
                });
            });
        });
    });

    describe('autofill value with extra leading and trailing whitespace (thousand separator is equal to whitespace too)', () => {
        it('<space x3>123456<space x3>', () => {
            const options = maskitoNumberOptionsGenerator({
                thousandSeparator: ' ',
            });

            expect(maskitoTransform('    123456    ', options)).toBe('123 456');
        });

        it('<space>|123 => |123', () => {
            const options = maskitoNumberOptionsGenerator({
                thousandSeparator: ' ',
            });

            expect(maskitoTransform({value: ' 123', selection: [1, 1]}, options)).toEqual(
                {
                    value: '123',
                    selection: [0, 0],
                },
            );
            // Check when initial calibration processor already worked
            expect(maskitoTransform({value: ' 123', selection: [1, 1]}, options)).toEqual(
                {
                    value: '123',
                    selection: [0, 0],
                },
            );
        });
    });

    it('[thousandSeparator] is equal to [decimalSeparator] when [maximumFractionDigits]=0', () => {
        const options = maskitoNumberOptionsGenerator({
            thousandSeparator: '.',
            decimalSeparator: '.', // default value
            maximumFractionDigits: 0, // default value
        });

        expect(maskitoTransform('123.456', options)).toBe('123.456');
    });
});
