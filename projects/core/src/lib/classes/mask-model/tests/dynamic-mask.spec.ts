import {describe, expect, it} from '@jest/globals';
import {MASKITO_DEFAULT_OPTIONS} from '@maskito/core';

import type {ElementState, MaskitoMask, MaskitoOptions} from '../../../types';
import {MaskModel} from '../mask-model';

const EMPTY_STATE: ElementState = {
    selection: [0, 0],
    value: '',
};

describe('MaskModel | Dynamic mask', () => {
    describe('switching on the fly works', () => {
        const SHORT: MaskitoMask = new Array(10).fill(null).map((_) => /\d/);
        const MEDIUM: MaskitoMask = [
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            ' ',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            ' ',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            ' ',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
        ];
        const LONG: MaskitoMask = new Array(20).fill(null).map((_) => /\d/);
        const maskitoOptions: Required<MaskitoOptions> = {
            ...MASKITO_DEFAULT_OPTIONS,
            mask: ({value}) => {
                const digitsCount = value.replaceAll(/\D/g, '').length;

                if (digitsCount <= 10) {
                    return SHORT;
                }

                if (digitsCount <= 16) {
                    return MEDIUM;
                }

                return LONG;
            },
        };

        it('enable short mask if number of digits is <=10', () => {
            const maskModel = new MaskModel(EMPTY_STATE, maskitoOptions);

            maskModel.addCharacters('01234abc56789');

            expect(maskModel.value).toBe('0123456789');
            expect(maskModel.selection).toEqual([
                '0123456789'.length,
                '0123456789'.length,
            ]);
        });

        it('enable medium mask if number of digits is 10 < x <= 16', () => {
            const maskModel = new MaskModel(EMPTY_STATE, maskitoOptions);

            maskModel.addCharacters('01234abc56789123456');

            expect(maskModel.value).toBe('0123 4567 8912 3456');
            expect(maskModel.selection).toEqual([
                '0123 4567 8912 3456'.length,
                '0123 4567 8912 3456'.length,
            ]);
        });

        it('enable long mask if number of digits is >16 (by paste)', () => {
            const maskModel = new MaskModel(EMPTY_STATE, maskitoOptions);

            maskModel.addCharacters('01234abc567891234567');

            expect(maskModel.value).toBe('01234567891234567');
            expect(maskModel.selection).toEqual([
                '01234567891234567'.length,
                '01234567891234567'.length,
            ]);
        });

        it('enable long mask if number of digits is >16 (by adding new character to the previous mask)', () => {
            const initialValue = '0123 4567 8912 3456';
            const maskModel = new MaskModel(
                {
                    value: initialValue,
                    selection: [initialValue.length, initialValue.length],
                },
                maskitoOptions,
            );

            maskModel.addCharacters('7');

            expect(maskModel.value).toBe('01234567891234567');
            expect(maskModel.selection).toEqual([
                '01234567891234567'.length,
                '01234567891234567'.length,
            ]);
        });
    });
});
