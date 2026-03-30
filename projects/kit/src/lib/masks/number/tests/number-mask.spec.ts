import {beforeEach, describe, expect, it} from '@jest/globals';
import {
    MASKITO_DEFAULT_OPTIONS,
    type MaskitoOptions,
    maskitoTransform,
} from '@maskito/core';
import {type MaskitoNumberParams, maskitoParseNumber} from '@maskito/kit';

import {intlPattern} from '../../../../../../demo/src/pages/kit/number/examples/9-thousand-separator-pattern-intl/mask';
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

            it('paste 1 000<space> => 1 000 |lbs.', () => {
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
        let params!: MaskitoNumberParams;
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
                params = {
                    prefix: 'lbs.',
                    decimalSeparator: '.',
                    maximumFractionDigits: 2,
                };
                options = maskitoNumberOptionsGenerator(params);
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
                expect(maskitoParseNumber(expected, params)).toBe(0.42);
            });

            it('42 => lbs.42', () => {
                const expected = `lbs.${CHAR_ZERO_WIDTH_SPACE}42`;

                expect(maskitoTransform('42', options)).toBe(expected);
                expect(maskitoParseNumber(expected, params)).toBe(42);
            });

            it('1 000 => lbs.1 000', () => {
                const expected = `lbs.${CHAR_ZERO_WIDTH_SPACE}1${CHAR_NO_BREAK_SPACE}000`;

                expect(maskitoTransform(`1${CHAR_NO_BREAK_SPACE}000`, options)).toBe(
                    expected,
                );
                expect(maskitoParseNumber(expected, params)).toBe(1000);
            });

            it('1 000. => lbs.1 000.', () => {
                const expected = `lbs.${CHAR_ZERO_WIDTH_SPACE}1${CHAR_NO_BREAK_SPACE}000.`;

                expect(maskitoTransform('1 000.', options)).toBe(expected);
                expect(maskitoParseNumber(expected, params)).toBe(1000);
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

    describe('`postfix` starts with point | [postfix]=".000 km" & [maximumFractionDigits]="0"', () => {
        let options: MaskitoOptions = MASKITO_DEFAULT_OPTIONS;

        beforeEach(() => {
            options = maskitoNumberOptionsGenerator({
                postfix: '.000 km',
                // Ensure that default point as decimal separator is compatible with postfix
                decimalSeparator: '.',
                maximumFractionDigits: 0,
            });
        });

        it('empty textfield => empty textfield', () => {
            expect(maskitoTransform('', options)).toBe('');
        });

        it('only postfix => only postfix', () => {
            expect(maskitoTransform('.000 km', options)).toBe('.000 km');
        });

        it('1.000 km => 1.000 km', () => {
            expect(maskitoTransform('1.000 km', options)).toBe('1.000 km');
        });

        it('100.000 km => 100.000 km', () => {
            expect(maskitoTransform('100.000 km', options)).toBe('100.000 km');
        });

        it('-1.000 km => -1.000 km', () => {
            expect(maskitoTransform(`${CHAR_HYPHEN}1.000 km`, options)).toBe(
                `${CHAR_MINUS}1.000 km`,
            );
        });

        it('thousandSeparator equals to empty string', () => {
            expect(
                maskitoTransform(
                    '123456789',
                    maskitoNumberOptionsGenerator({
                        postfix: '.000 km',
                        thousandSeparator: '',
                    }),
                ),
            ).toBe('123456789.000 km');
        });

        describe('thousandSeparator equals to point too', () => {
            beforeEach(() => {
                options = maskitoNumberOptionsGenerator({
                    postfix: '.000 km',
                    thousandSeparator: '.',
                    // by default, decimalSeparator === '.' & maximumFractionDigits === 0
                });
            });

            it('-123 => -123.000 km', () => {
                expect(maskitoTransform('-123', options)).toBe(`${CHAR_MINUS}123.000 km`);
            });

            it('123456 => 123.456.000 km', () => {
                expect(maskitoTransform('123456', options)).toBe('123.456.000 km');
            });
        });
    });

    describe('should transform full width number to half width', () => {
        describe('at any time', () => {
            it('at the 1st time (after initialization)', () => {
                const options = maskitoNumberOptionsGenerator({thousandSeparator: '_'});

                expect(maskitoTransform('１２３４５', options)).toBe('12_345');
            });

            it('at the 2nd time (after initialization)', () => {
                const options = maskitoNumberOptionsGenerator({thousandSeparator: '_'});

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
            const options = maskitoNumberOptionsGenerator({thousandSeparator: ' '});

            expect(maskitoTransform('    123456    ', options)).toBe('123 456');
        });

        it('<space>|123 => |123', () => {
            const options = maskitoNumberOptionsGenerator({thousandSeparator: ' '});

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

    describe('thousandSeparatorPattern', () => {
        it('default behavior unchanged: 123456789 => 123 456 789 (non-breaking space)', () => {
            const options = maskitoNumberOptionsGenerator({
                thousandSeparator: CHAR_NO_BREAK_SPACE,
            });

            expect(maskitoTransform('123456789', options)).toBe(
                `123${CHAR_NO_BREAK_SPACE}456${CHAR_NO_BREAK_SPACE}789`,
            );
        });

        it('small number unaffected: 999 => 999', () => {
            const options = maskitoNumberOptionsGenerator({thousandSeparator: ','});

            expect(maskitoTransform('999', options)).toBe('999');
        });

        it('zero unaffected: 0 => 0', () => {
            const options = maskitoNumberOptionsGenerator({thousandSeparator: ','});

            expect(maskitoTransform('0', options)).toBe('0');
        });

        describe('Indian numbering system pattern', () => {
            const indianPattern = (digits: string): readonly string[] => {
                if (!digits) {
                    return [];
                }

                const last3 = digits.slice(-3);
                const rest = digits.slice(0, -3);
                const groups: string[] = [];

                for (let i = 0; i < rest.length; i += 2) {
                    groups.push(rest.slice(i, i + 2));
                }

                return [...groups, last3].filter(Boolean);
            };

            it('123456789 => 12,34,56,789', () => {
                const options = maskitoNumberOptionsGenerator({
                    thousandSeparator: ',',
                    thousandSeparatorPattern: indianPattern,
                });

                expect(maskitoTransform('123456789', options)).toBe('12,34,56,789');
            });

            it('single group: 1200 => 1,200', () => {
                const options = maskitoNumberOptionsGenerator({
                    thousandSeparator: ',',
                    thousandSeparatorPattern: indianPattern,
                });

                expect(maskitoTransform('1200', options)).toBe('1,200');
            });

            it('negative number: -123456789 => -12,34,56,789', () => {
                const options = maskitoNumberOptionsGenerator({
                    thousandSeparator: ',',
                    thousandSeparatorPattern: indianPattern,
                });

                expect(maskitoTransform('-123456789', options)).toBe(
                    `${CHAR_MINUS}12,34,56,789`,
                );
            });

            it('decimal part is unaffected: 1234567.89 => 12,34,567.89', () => {
                const options = maskitoNumberOptionsGenerator({
                    thousandSeparator: ',',
                    decimalSeparator: '.',
                    maximumFractionDigits: 2,
                    thousandSeparatorPattern: indianPattern,
                });

                expect(maskitoTransform('1234567.89', options)).toBe('12,34,567.89');
            });

            it('idempotent: re-transform 12,34,56,789 => 12,34,56,789', () => {
                const options = maskitoNumberOptionsGenerator({
                    thousandSeparator: ',',
                    thousandSeparatorPattern: indianPattern,
                });

                expect(maskitoTransform('12,34,56,789', options)).toBe('12,34,56,789');
            });
        });

        describe('custom thousandSeparator "_"', () => {
            it('1234567 => 1_234_567', () => {
                const options = maskitoNumberOptionsGenerator({thousandSeparator: '_'});

                expect(maskitoTransform('1234567', options)).toBe('1_234_567');
            });

            it('negative number: -1234567 => -1_234_567', () => {
                const options = maskitoNumberOptionsGenerator({thousandSeparator: '_'});

                expect(maskitoTransform('-1234567', options)).toBe(
                    `${CHAR_MINUS}1_234_567`,
                );
            });

            it('decimal part is unaffected: 1234567.89 => 1_234_567.89', () => {
                const options = maskitoNumberOptionsGenerator({
                    thousandSeparator: '_',
                    decimalSeparator: '.',
                    maximumFractionDigits: 2,
                });

                expect(maskitoTransform('1234567.89', options)).toBe('1_234_567.89');
            });

            it('idempotent: re-transform 1_234_567 => 1_234_567', () => {
                const options = maskitoNumberOptionsGenerator({thousandSeparator: '_'});

                expect(maskitoTransform('1_234_567', options)).toBe('1_234_567');
            });

            it('with Indian 2+3 pattern: 1234567 => 12_34_567', () => {
                const options = maskitoNumberOptionsGenerator({
                    thousandSeparator: '_',
                    thousandSeparatorPattern: intlPattern('en-IN'),
                });

                expect(maskitoTransform('1234567', options)).toBe('12_34_567');
            });
        });

        it('no-op pattern (single group): 1234567 => 1234567', () => {
            const noGroupingPattern = (digits: string): readonly string[] =>
                digits ? [digits] : [];
            const options = maskitoNumberOptionsGenerator({
                thousandSeparator: ',',
                thousandSeparatorPattern: noGroupingPattern,
            });

            expect(maskitoTransform('1234567', options)).toBe('1234567');
        });

        it('prefix + custom pattern: ₹1234567 => ₹12,34,567', () => {
            const options = maskitoNumberOptionsGenerator({
                prefix: '₹',
                thousandSeparator: ',',
                thousandSeparatorPattern: intlPattern('en-IN'),
            });

            expect(maskitoTransform('1234567', options)).toBe('₹12,34,567');
        });

        it('postfix + custom pattern: 1234567 => 1.234.567 €', () => {
            const options = maskitoNumberOptionsGenerator({
                postfix: ' €',
                thousandSeparator: '.',
                decimalSeparator: ',',
                thousandSeparatorPattern: intlPattern('de-DE'),
            });

            expect(maskitoTransform('1234567', options)).toBe('1.234.567 €');
        });

        describe('Intl.NumberFormat-based grouping', () => {
            it('de-DE: 1234567 => 1.234.567 (3-digit grouping, dot separator)', () => {
                const options = maskitoNumberOptionsGenerator({
                    thousandSeparator: '.',
                    decimalSeparator: ',',
                    thousandSeparatorPattern: intlPattern('de-DE'),
                });

                expect(maskitoTransform('1234567', options)).toBe('1.234.567');
            });

            it('ja-JP: 1234567 => 1,234,567 (3-digit grouping)', () => {
                const options = maskitoNumberOptionsGenerator({
                    thousandSeparator: ',',
                    thousandSeparatorPattern: intlPattern('ja-JP'),
                });

                expect(maskitoTransform('1234567', options)).toBe('1,234,567');
            });

            it('en-IN: 123456789 => 12,34,56,789 (Indian 2+3 grouping)', () => {
                const options = maskitoNumberOptionsGenerator({
                    thousandSeparator: ',',
                    thousandSeparatorPattern: intlPattern('en-IN'),
                });

                expect(maskitoTransform('123456789', options)).toBe('12,34,56,789');
            });

            it('en-IN: single group 1200 => 1,200', () => {
                const options = maskitoNumberOptionsGenerator({
                    thousandSeparator: ',',
                    thousandSeparatorPattern: intlPattern('en-IN'),
                });

                expect(maskitoTransform('1200', options)).toBe('1,200');
            });

            it('en-US: same as default 3-digit grouping', () => {
                const options = maskitoNumberOptionsGenerator({
                    thousandSeparator: ',',
                    thousandSeparatorPattern: intlPattern('en-US'),
                });

                expect(maskitoTransform('123456789', options)).toBe('123,456,789');
            });

            it('en-US: large number 1234567890 => 1,234,567,890', () => {
                const options = maskitoNumberOptionsGenerator({
                    thousandSeparator: ',',
                    thousandSeparatorPattern: intlPattern('en-US'),
                });

                expect(maskitoTransform('1234567890', options)).toBe('1,234,567,890');
            });

            it('en-IN: negative number -123456789 => -12,34,56,789', () => {
                const options = maskitoNumberOptionsGenerator({
                    thousandSeparator: ',',
                    thousandSeparatorPattern: intlPattern('en-IN'),
                });

                expect(maskitoTransform('-123456789', options)).toBe(
                    `${CHAR_MINUS}12,34,56,789`,
                );
            });

            it('de-DE: decimal part unaffected: 1234567,89 => 1.234.567,89', () => {
                const options = maskitoNumberOptionsGenerator({
                    thousandSeparator: '.',
                    decimalSeparator: ',',
                    maximumFractionDigits: 2,
                    thousandSeparatorPattern: intlPattern('de-DE'),
                });

                expect(maskitoTransform('1234567,89', options)).toBe('1.234.567,89');
            });

            it('de-DE: minimumFractionDigits: 1234 => 1.234,00', () => {
                const options = maskitoNumberOptionsGenerator({
                    thousandSeparator: '.',
                    decimalSeparator: ',',
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                    thousandSeparatorPattern: intlPattern('de-DE'),
                });

                expect(maskitoTransform('1234', options)).toBe('1.234,00');
            });

            it('hi-IN: 1234567 => 12,34,567 (Hindi India, Indian grouping)', () => {
                const options = maskitoNumberOptionsGenerator({
                    thousandSeparator: ',',
                    thousandSeparatorPattern: intlPattern('hi-IN'),
                });

                expect(maskitoTransform('1234567', options)).toBe('12,34,567');
            });

            it('hi-IN: 123456789 => 12,34,56,789 (scales same as en-IN)', () => {
                const options = maskitoNumberOptionsGenerator({
                    thousandSeparator: ',',
                    thousandSeparatorPattern: intlPattern('hi-IN'),
                });

                expect(maskitoTransform('123456789', options)).toBe('12,34,56,789');
            });

            it('fr-FR: 1234567 => 1,234,567 (French, 3-digit grouping)', () => {
                const options = maskitoNumberOptionsGenerator({
                    thousandSeparator: ',',
                    thousandSeparatorPattern: intlPattern('fr-FR'),
                });

                expect(maskitoTransform('1234567', options)).toBe('1,234,567');
            });

            it('ru-RU: 1234567 => 1,234,567 (Russian, 3-digit grouping)', () => {
                const options = maskitoNumberOptionsGenerator({
                    thousandSeparator: ',',
                    thousandSeparatorPattern: intlPattern('ru-RU'),
                });

                expect(maskitoTransform('1234567', options)).toBe('1,234,567');
            });

            it('pt-BR: 1234567 => 1,234,567 (Brazilian Portuguese, 3-digit grouping)', () => {
                const options = maskitoNumberOptionsGenerator({
                    thousandSeparator: ',',
                    thousandSeparatorPattern: intlPattern('pt-BR'),
                });

                expect(maskitoTransform('1234567', options)).toBe('1,234,567');
            });

            it('zh-CN: 1234567 => 1,234,567 (Chinese Simplified, 3-digit grouping)', () => {
                const options = maskitoNumberOptionsGenerator({
                    thousandSeparator: ',',
                    thousandSeparatorPattern: intlPattern('zh-CN'),
                });

                expect(maskitoTransform('1234567', options)).toBe('1,234,567');
            });

            it('ko-KR: 1234567 => 1,234,567 (Korean, 3-digit grouping)', () => {
                const options = maskitoNumberOptionsGenerator({
                    thousandSeparator: ',',
                    thousandSeparatorPattern: intlPattern('ko-KR'),
                });

                expect(maskitoTransform('1234567', options)).toBe('1,234,567');
            });

            it('tr-TR: 1234567 => 1,234,567 (Turkish, 3-digit grouping)', () => {
                const options = maskitoNumberOptionsGenerator({
                    thousandSeparator: ',',
                    thousandSeparatorPattern: intlPattern('tr-TR'),
                });

                expect(maskitoTransform('1234567', options)).toBe('1,234,567');
            });

            describe('Indian 2+3 grouping', () => {
                it('ne-NP: uses Indian 2+3 grouping', () => {
                    const options = maskitoNumberOptionsGenerator({
                        thousandSeparator: ',',
                        thousandSeparatorPattern: intlPattern('ne-NP'),
                    });

                    expect(maskitoTransform('1234567', options)).toBe('12,34,567');
                });

                it('en-IN: 1200 => 1,200 (Indian grouping, 4-digit number)', () => {
                    const options = maskitoNumberOptionsGenerator({
                        thousandSeparator: ',',
                        thousandSeparatorPattern: intlPattern('en-IN'),
                    });

                    expect(maskitoTransform('1200', options)).toBe('1,200');
                });
            });

            it('es-ES: 1200 => 1200 (no separator for 4-digit numbers in Spanish locale)', () => {
                const options = maskitoNumberOptionsGenerator({
                    thousandSeparator: ',',
                    thousandSeparatorPattern: intlPattern('es-ES'),
                });

                expect(maskitoTransform('1200', options)).toBe('1200');
            });
        });
    });

    describe('BigInt support', () => {
        it('number beyond MAX_SAFE_INTEGER is formatted correctly', () => {
            const options = maskitoNumberOptionsGenerator({thousandSeparator: ','});

            expect(maskitoTransform('9007199254740993', options)).toBe(
                '9,007,199,254,740,993',
            );
        });

        it('negative number beyond MIN_SAFE_INTEGER is formatted correctly', () => {
            const options = maskitoNumberOptionsGenerator({thousandSeparator: ','});

            expect(maskitoTransform('-9007199254740993', options)).toBe(
                `${CHAR_MINUS}9,007,199,254,740,993`,
            );
        });

        it('max: BigInt clamps value exceeding max', () => {
            const options = maskitoNumberOptionsGenerator({
                thousandSeparator: ',',
                max: BigInt('1000000'),
            });

            expect(maskitoTransform('9007199254740993', options)).toBe('1,000,000');
        });

        it('min: BigInt clamps negative value below min', () => {
            const options = maskitoNumberOptionsGenerator({
                thousandSeparator: ',',
                min: BigInt('-1000000'),
            });

            expect(maskitoTransform('-9007199254740993', options)).toBe(
                `${CHAR_MINUS}1,000,000`,
            );
        });

        it('thousandSeparatorPattern + BigInt: large Indian-grouped number', () => {
            const options = maskitoNumberOptionsGenerator({
                thousandSeparator: ',',
                thousandSeparatorPattern: intlPattern('en-IN'),
            });

            expect(maskitoTransform('12345678901', options)).toBe('12,34,56,78,901');
        });
    });

    describe('min/max validation should ignore digits inside affixes', () => {
        describe('postfix = cm3', () => {
            it('value within max is NOT clamped', () => {
                expect(
                    maskitoTransform(
                        '123',
                        maskitoNumberOptionsGenerator({max: 123, postfix: 'cm3'}),
                    ),
                ).toBe('123cm3');

                expect(
                    maskitoTransform(
                        '1234567890123456',
                        maskitoNumberOptionsGenerator({
                            postfix: 'cm3',
                            max: Number.MAX_SAFE_INTEGER,
                        }),
                    ),
                ).toBe('1 234 567 890 123 456cm3');
            });

            it('value exceeding max IS clamped without losing postfix', () => {
                const options = maskitoNumberOptionsGenerator({
                    thousandSeparator: ' ',
                    max: 999,
                    postfix: 'cm3',
                });

                expect(maskitoTransform('12345', options)).toBe('999cm3');
            });

            it('negative value within min is NOT clamped', () => {
                expect(
                    maskitoTransform(
                        '-1234567890123456',
                        maskitoNumberOptionsGenerator({postfix: 'cm3'}),
                    ),
                ).toBe(`${CHAR_MINUS}1 234 567 890 123 456cm3`);
            });
        });

        describe('prefix = 100 x', () => {
            it('value within max is NOT clamped', () => {
                expect(
                    maskitoTransform(
                        '500',
                        maskitoNumberOptionsGenerator({
                            max: 999,
                            prefix: '100 x ',
                        }),
                    ),
                ).toBe('100 x 500');
            });

            it('value exceeding max IS clamped', () => {
                expect(
                    maskitoTransform(
                        '1234',
                        maskitoNumberOptionsGenerator({
                            max: 999,
                            prefix: '100 x ',
                        }),
                    ),
                ).toBe('100 x 999');
            });
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
