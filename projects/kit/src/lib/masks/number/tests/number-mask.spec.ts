import {maskitoTransform} from '@maskito/core';

import {maskitoNumberOptionsGenerator} from '../number-mask';

describe('Number', () => {
    describe('`precision` is `0` and it is paste from clipboard', () => {
        const options = maskitoNumberOptionsGenerator({
            decimalSeparator: ',',
            decimalPseudoSeparators: ['.'],
            precision: 0,
        });

        it('drops decimal part (123,45)', () => {
            expect(maskitoTransform('123,45', options)).toBe('123');
        });

        it('drops decimal part (123.45)', () => {
            expect(maskitoTransform('123.45', options)).toBe('123');
        });
    });
});
