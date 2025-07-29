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
                    maximumFractionDigits: 2,
                    decimalSeparator: '.',
                    thousandSeparator: ' ',
                }),
            ).toBe('1 000 000.42');
        });

        it('thousand separator is hyphen', () => {
            expect(
                maskitoStringifyNumber(1000000.42, {
                    maximumFractionDigits: 2,
                    decimalSeparator: '.',
                    thousandSeparator: '-',
                }),
            ).toBe('1-000-000.42');
        });

        it('thousand separator is empty string', () => {
            expect(
                maskitoStringifyNumber(1000000.42, {
                    maximumFractionDigits: 2,
                    thousandSeparator: '',
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

        it('trailing decimal separator (minimumFractionDigits > maximumFractionDigits => maximumFractionDigits has more priority)', () => {
            expect(
                maskitoStringifyNumber(0, {
                    maximumFractionDigits: 0,
                    decimalSeparator: '.',
                    minimumFractionDigits: 2,
                }),
            ).toBe('0');
        });

        it('trailing decimal separator maximumFractionDigits', () => {
            expect(
                maskitoStringifyNumber(0, {
                    maximumFractionDigits: 2,
                    decimalSeparator: '.',
                    minimumFractionDigits: 2,
                }),
            ).toBe('0.00');
        });

        it('number with exponential notation', () => {
            expect(maskitoStringifyNumber(0.000000012, {maximumFractionDigits: 10})).toBe(
                '0.000000012',
            );
            expect(
                maskitoStringifyNumber(1.2e-8, {maximumFractionDigits: 10, prefix: '$'}),
            ).toBe('$0.000000012');
        });
    });

    describe('decimal separator is comma', () => {
        it('thousand separator is space', () => {
            expect(
                maskitoStringifyNumber(42111.42, {
                    maximumFractionDigits: 2,
                    decimalSeparator: ',',
                    thousandSeparator: ' ',
                }),
            ).toBe('42 111,42');
        });

        it('thousand separator is hyphen', () => {
            expect(
                maskitoStringifyNumber(42111.42, {
                    maximumFractionDigits: 2,
                    decimalSeparator: ',',
                    thousandSeparator: '-',
                }),
            ).toBe('42-111,42');
        });

        it('thousand separator is empty string', () => {
            expect(
                maskitoStringifyNumber(42111.42, {
                    maximumFractionDigits: 2,
                    decimalSeparator: ',',
                    thousandSeparator: '',
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

        it('trailing decimal separator (minimumFractionDigits > maximumFractionDigits => maximumFractionDigits has more priority)', () => {
            expect(
                maskitoStringifyNumber(42, {
                    maximumFractionDigits: 0,
                    decimalSeparator: ',',
                    minimumFractionDigits: 2,
                }),
            ).toBe('42');
        });

        it('with decimal part', () => {
            expect(
                maskitoStringifyNumber(42.1, {
                    decimalSeparator: ',',
                    thousandSeparator: '.',
                    maximumFractionDigits: 2,
                }),
            ).toBe('42,1');
        });

        it('zero-padded fraction part', () => {
            expect(
                maskitoStringifyNumber(42, {
                    maximumFractionDigits: 2,
                    decimalSeparator: ',',
                    minimumFractionDigits: 2,
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
                    maximumFractionDigits: 3,
                }),
            ).toBe(`${CHAR_MINUS}123.456`);
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
            ).toBe(`>${CHAR_MINUS}42`);
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
                        maximumFractionDigits: 2,
                        postfix: ' lbs.',
                    }),
                ).toBe('0.42 lbs.');

                expect(
                    maskitoStringifyNumber(1000.42, {
                        maximumFractionDigits: 2,
                        thousandSeparator: ' ',
                        postfix: ' lbs.',
                    }),
                ).toBe('1 000.42 lbs.');

                expect(
                    maskitoStringifyNumber(1000, {
                        maximumFractionDigits: 0,
                        minimumFractionDigits: 2,
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
                        maximumFractionDigits: 2,
                        prefix: 'lbs. ',
                    }),
                ).toBe('lbs. 0.42');

                expect(
                    maskitoStringifyNumber(1000.42, {
                        maximumFractionDigits: 2,
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

    describe('[maximumFractionDigits] handling', () => {
        it('handles zero maximumFractionDigits correctly', () => {
            expect(
                maskitoStringifyNumber(123.456, {
                    maximumFractionDigits: 0,
                }),
            ).toBe('123');
        });

        it('handles custom maximumFractionDigits correctly', () => {
            expect(
                maskitoStringifyNumber(123.456, {
                    maximumFractionDigits: 1,
                }),
            ).toBe('123.4');

            expect(
                maskitoStringifyNumber(123.456, {
                    maximumFractionDigits: 4,
                }),
            ).toBe('123.456');
        });

        it('handles zero padding correctly', () => {
            expect(
                maskitoStringifyNumber(123, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                }),
            ).toBe('123.00');

            expect(
                maskitoStringifyNumber(123, {
                    maximumFractionDigits: 0,
                    minimumFractionDigits: 0,
                }),
            ).toBe('123');
        });
    });
});
