import {MASKITO_DEFAULT_OPTIONS, MaskitoOptions, maskitoTransform} from '@maskito/core';
import {maskitoDateOptionsGenerator} from '@maskito/kit';

/**
 * If any of these tests fail,
 * it can mean that browser autofill or composition are not working properly
 * for Date mask
 */
describe('Date (maskitoTransform)', () => {
    describe('[mode]="yyyy/mm/dd"', () => {
        let options: MaskitoOptions = MASKITO_DEFAULT_OPTIONS;

        beforeEach(() => {
            options = maskitoDateOptionsGenerator({
                mode: 'yyyy/mm/dd',
                separator: '/',
            });
        });

        // TODO: fix this bug later
        xit('pads digit > 1 with zero for months (12345 => 1234/05)', () => {
            expect(maskitoTransform('12345', options)).toBe('1234/05');
        });

        // TODO: https://github.com/taiga-family/maskito/pull/907
        xit('accepts full width characters', () => {
            expect(maskitoTransform('１２３４５', options)).toBe('1234/05');
            expect(maskitoTransform('１２３４１２２６', options)).toBe('1234/12/26');
        });
    });
});
