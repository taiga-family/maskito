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
});
