import {MASKITO_DEFAULT_OPTIONS, MaskitoOptions, maskitoTransform} from '@maskito/core';

import {maskitoNumberOptionsGenerator} from '../number-mask';

describe('Number (maskitoTransform)', () => {
    describe('`precision` is `0`', () => {
        let options: MaskitoOptions = MASKITO_DEFAULT_OPTIONS;

        beforeEach(() => {
            options = maskitoNumberOptionsGenerator({
                decimalSeparator: ',',
                decimalPseudoSeparators: ['.'],
                precision: 0,
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
                precision: 2,
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
                precision: 2,
                decimalZeroPadding: true,
            });
        });

        it('add dots and decimals (21.121.321,00)', () => {
            expect(maskitoTransform('21121321', options)).toBe('21.121.321,00');
        });
    });

    describe('`postfix` contains point and space (` lbs.`)', () => {
        let options: MaskitoOptions = MASKITO_DEFAULT_OPTIONS;

        describe('precision: 2', () => {
            beforeEach(() => {
                options = maskitoNumberOptionsGenerator({
                    postfix: ' lbs.',
                    precision: 2,
                });
            });

            it('Empty textfield => empty textfield', () => {
                expect(maskitoTransform('', options)).toBe('');
            });

            it('Only postfix => Only postfix', () => {
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

            it('1 000 lbs. => 1 000 lbs.', () => {
                expect(maskitoTransform('1 000 lbs.', options)).toBe('1 000 lbs.');
            });
        });

        describe('precision: 0', () => {
            beforeEach(() => {
                options = maskitoNumberOptionsGenerator({
                    postfix: ' lbs.',
                    precision: 0,
                });
            });

            it('Empty textfield => empty textfield', () => {
                expect(maskitoTransform('', options)).toBe('');
            });

            it('Only postfix => Only postfix', () => {
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

        describe('precision: 2', () => {
            beforeEach(() => {
                options = maskitoNumberOptionsGenerator({
                    prefix: 'lbs. ',
                    precision: 2,
                });
            });

            it('Empty textfield => empty textfield', () => {
                expect(maskitoTransform('', options)).toBe('');
            });

            it('Only prefix => Only prefix', () => {
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

        describe('precision: 0', () => {
            beforeEach(() => {
                options = maskitoNumberOptionsGenerator({
                    prefix: 'lbs. ',
                    precision: 0,
                });
            });

            it('Empty textfield => empty textfield', () => {
                expect(maskitoTransform('', options)).toBe('');
            });

            it('Only prefix => Only prefix', () => {
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
    });
});
