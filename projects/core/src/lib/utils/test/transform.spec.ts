import {maskitoTransform} from '@maskito/core';
import {maskitoNumberOptionsGenerator} from '@maskito/kit';

describe('maskitoTransform', () => {
    const maskitoOptions = maskitoNumberOptionsGenerator({
        thousandSeparator: ' ',
        precision: 2,
        decimalSeparator: ',',
        decimalPseudoSeparators: ['.'],
    });

    it('returns string if the first argument is a string', () => {
        expect(typeof maskitoTransform('100', maskitoOptions)).toBe('string');
    });

    it('returns ElementState if the first argument is a ElementState', () => {
        const res = maskitoTransform({value: '', selection: [0, 0]}, maskitoOptions);

        expect(res).toBeTruthy();
        expect(typeof res).toBe('object');
    });

    it('formats value using preprocessor', () => {
        expect(maskitoTransform('100.42', maskitoOptions)).toBe('100,42');
        expect(
            maskitoTransform(
                {
                    value: '100.42',
                    selection: [2, 2],
                },
                maskitoOptions,
            ),
        ).toEqual({value: '100,42', selection: [2, 2]});
    });

    it('formats value using postprocessor', () => {
        expect(maskitoTransform('1000000', maskitoOptions)).toBe('1 000 000');
        expect(
            maskitoTransform(
                {
                    value: '1000000',
                    selection: [4, 4],
                },
                maskitoOptions,
            ),
        ).toEqual({value: '1 000 000', selection: [6, 6]});
    });

    it('drops invalid characters (mask expression works)', () => {
        expect(maskitoTransform('42Taiga UI42', maskitoOptions)).toBe('4 242');
        expect(
            maskitoTransform(
                {
                    value: '42Taiga UI42',
                    selection: [11, 11],
                },
                maskitoOptions,
            ),
        ).toEqual({value: '4 242', selection: [4, 4]});
    });
});
