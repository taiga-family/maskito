import {describe, expect, it} from '@jest/globals';

import {
    CHAR_EM_DASH,
    CHAR_EN_DASH,
    CHAR_HYPHEN,
    CHAR_JP_HYPHEN,
    CHAR_MINUS,
} from '../../../../constants';
import {maskitoStringifyNumber} from '../stringify-number';

describe('maskitoStringifyNumber', () => {
    describe('decimal separator is dot (default one)', () => {
        it('thousand separator is space', () => {
            expect(
                maskitoStringifyNumber(1000000.42, {
                    precision: 2,
                    decimalSeparator: '.',
                    thousandSeparator: ' ',
                }),
            ).toBe('1 000 000.42');
        });

        it('thousand separator is hyphen', () => {
            expect(
                maskitoStringifyNumber(1000000.42, {
                    precision: 2,
                    decimalSeparator: '.',
                    thousandSeparator: '-',
                }),
            ).toBe('1-000-000.42');
        });

        it('thousand separator is empty string', () => {
            expect(
                maskitoStringifyNumber(1000000.42, {
                    precision: 2,
                    thousandSeparator: ' ',
                    decimalSeparator: '.',
                }),
            ).toBe('1000000.42');
        });

        it('empty decimal part & thousand separator is comma', () => {
            expect(
                maskitoStringifyNumber(1000000, {
                    thousandSeparator: ',',
                }),
            ).toBe('1,000,000');
        });

        it('trailing decimal separator', () => {
            expect(
                maskitoStringifyNumber(0, {
                    precision: 0,
                    decimalSeparator: '.',
                    decimalZeroPadding: true,
                }),
            ).toBe('0');
        });

        it('trailing decimal separator precision', () => {
            expect(
                maskitoStringifyNumber(0, {
                    precision: 2,
                    decimalSeparator: '.',
                    decimalZeroPadding: true,
                }),
            ).toBe('0.00');
        });
    });

    describe('decimal separator is comma', () => {
        it('thousand separator is space', () => {
            expect(
                maskitoStringifyNumber(42111.42, {
                    precision: 2,
                    decimalSeparator: ',',
                    thousandSeparator: ' ',
                }),
            ).toBe('42 111,42');
        });

        it('thousand separator is hyphen', () => {
            expect(
                maskitoStringifyNumber(42111.42, {
                    precision: 2,
                    decimalSeparator: ',',
                    thousandSeparator: '-',
                }),
            ).toBe('42-111,42');
        });

        it('thousand separator is empty string', () => {
            expect(
                maskitoStringifyNumber(42111.42, {
                    precision: 2,
                    decimalSeparator: ',',
                }),
            ).toBe('42111,42');
        });

        it('empty decimal part & thousand separator is dot', () => {
            expect(
                maskitoStringifyNumber(42111, {
                    decimalSeparator: ',',
                    thousandSeparator: '.',
                }),
            ).toBe('42.111');
        });

        it('trailing decimal separator', () => {
            expect(
                maskitoStringifyNumber(42, {
                    precision: 0,
                    decimalSeparator: ',',
                    decimalZeroPadding: true,
                }),
            ).toBe('42');
        });

        it('trailing decimal separator precision', () => {
            expect(
                maskitoStringifyNumber(42, {
                    precision: 2,
                    decimalSeparator: ',',
                    decimalZeroPadding: true,
                }),
            ).toBe('42,00');
        });
    });

    describe('negative numbers', () => {
        describe('minus sign', () => {
            it('can be minus', () => {
                expect(
                    maskitoStringifyNumber(-1, {
                        minusSign: CHAR_MINUS,
                    }),
                ).toBe(`${CHAR_MINUS}1`);
            });

            it('can be hyphen', () => {
                expect(
                    maskitoStringifyNumber(-123456, {
                        minusSign: CHAR_HYPHEN,
                        thousandSeparator: ' ',
                    }),
                ).toBe(`${CHAR_HYPHEN}123 456`);
            });

            it('can be en-dash', () => {
                expect(
                    maskitoStringifyNumber(-123456789, {
                        minusSign: CHAR_EN_DASH,
                        thousandSeparator: ' ',
                    }),
                ).toBe(`${CHAR_EN_DASH}123 456 789`);
            });

            it('can be em-dash', () => {
                expect(
                    maskitoStringifyNumber(-42, {
                        minusSign: CHAR_EM_DASH,
                    }),
                ).toBe(`${CHAR_EM_DASH}42`);
            });

            it('can be katakana-hiragana prolonged sound mark', () => {
                expect(
                    maskitoStringifyNumber(-42, {
                        minusSign: CHAR_JP_HYPHEN,
                    }),
                ).toBe(`${CHAR_JP_HYPHEN}42`);
            });
        });

        it('stringifies negative integer number when thousand separator is hyphen & minus sign is hyphen', () => {
            expect(
                maskitoStringifyNumber(-123456, {
                    thousandSeparator: '-',
                    minusSign: '-',
                }),
            ).toBe('-123-456');
        });

        it('stringifies negative number with decimal part', () => {
            expect(
                maskitoStringifyNumber(-123.456, {
                    precision: 3,
                }),
            ).toBe('-123.456');
        });
    });

    describe('Prefix & Postfix', () => {
        it('stringifies number with only prefix', () => {
            expect(
                maskitoStringifyNumber(42, {
                    prefix: '$',
                }),
            ).toBe('$42');
        });

        it('stringifies number with only postfix', () => {
            expect(
                maskitoStringifyNumber(42, {
                    postfix: '%',
                }),
            ).toBe('42%');
        });

        it('stringifies number with both prefix and postfix', () => {
            expect(
                maskitoStringifyNumber(42, {
                    prefix: '$',
                    postfix: ' per day',
                }),
            ).toBe('$42 per day');
        });

        it('stringifies negative number with prefix', () => {
            expect(
                maskitoStringifyNumber(-42, {
                    prefix: '>',
                }),
            ).toBe('>-42');
        });

        describe('prefix/postfix includes point and space', () => {
            it('stringifies INTEGER number with postfix " lbs."', () => {
                expect(
                    maskitoStringifyNumber(42, {
                        postfix: ' lbs.',
                    }),
                ).toBe('42 lbs.');

                expect(
                    maskitoStringifyNumber(1000, {
                        thousandSeparator: ' ',
                        postfix: ' lbs.',
                    }),
                ).toBe('1 000 lbs.');
            });

            it('stringifies DECIMAL number with postfix " lbs."', () => {
                expect(
                    maskitoStringifyNumber(0.42, {
                        precision: 2,
                        postfix: ' lbs.',
                    }),
                ).toBe('0.42 lbs.');

                expect(
                    maskitoStringifyNumber(1000.42, {
                        precision: 2,
                        thousandSeparator: ' ',
                        postfix: ' lbs.',
                    }),
                ).toBe('1 000.42 lbs.');

                expect(
                    maskitoStringifyNumber(1000, {
                        precision: 0,
                        decimalZeroPadding: true,
                        thousandSeparator: ' ',
                        postfix: ' lbs.',
                    }),
                ).toBe('1 000 lbs.');
            });

            it('stringifies INTEGER number with prefix "lbs. "', () => {
                expect(
                    maskitoStringifyNumber(42, {
                        prefix: 'lbs. ',
                    }),
                ).toBe('lbs. 42');

                expect(
                    maskitoStringifyNumber(1000, {
                        thousandSeparator: ' ',
                        prefix: 'lbs. ',
                    }),
                ).toBe('lbs. 1 000');
            });

            it('stringifies DECIMAL number with prefix "lbs. "', () => {
                expect(
                    maskitoStringifyNumber(0.42, {
                        precision: 2,
                        prefix: 'lbs. ',
                    }),
                ).toBe('lbs. 0.42');

                expect(
                    maskitoStringifyNumber(1000.42, {
                        precision: 2,
                        thousandSeparator: ' ',
                        prefix: 'lbs. ',
                    }),
                ).toBe('lbs. 1 000.42');
            });
        });
    });

    describe('Min and Max constraints', () => {
        it('applies min constraint', () => {
            expect(
                maskitoStringifyNumber(-10, {
                    min: 0,
                }),
            ).toBe('0');
        });

        it('applies max constraint', () => {
            expect(
                maskitoStringifyNumber(1000, {
                    max: 100,
                }),
            ).toBe('100');
        });

        it('applies both min and max constraints', () => {
            expect(
                maskitoStringifyNumber(150, {
                    min: 0,
                    max: 100,
                }),
            ).toBe('100');

            expect(
                maskitoStringifyNumber(-50, {
                    min: 0,
                    max: 100,
                }),
            ).toBe('0');

            expect(
                maskitoStringifyNumber(50, {
                    min: 0,
                    max: 100,
                }),
            ).toBe('50');
        });
    });

    describe('Decimal precision handling', () => {
        it('handles zero precision correctly', () => {
            expect(
                maskitoStringifyNumber(123.456, {
                    precision: 0,
                }),
            ).toBe('123');
        });

        it('handles custom precision correctly', () => {
            expect(
                maskitoStringifyNumber(123.456, {
                    precision: 1,
                }),
            ).toBe('123.5');

            expect(
                maskitoStringifyNumber(123.456, {
                    precision: 4,
                }),
            ).toBe('123.4560');
        });

        it('handles zero padding correctly', () => {
            expect(
                maskitoStringifyNumber(123, {
                    precision: 2,
                    decimalZeroPadding: true,
                }),
            ).toBe('123.00');

            expect(
                maskitoStringifyNumber(123, {
                    precision: 0,
                    decimalZeroPadding: false,
                }),
            ).toBe('123');
        });
    });
});
