import {MASKITO_DEFAULT_OPTIONS} from '../../../constants';
import type {MaskitoOptions} from '../../../types';
import {MaskModel} from '../mask-model';

describe('MaskModel | Fixed characters', () => {
    describe('New typed character is equal to the previous (already existing) fixed character', () => {
        const phoneMaskitoOptions: Required<MaskitoOptions> = {
            ...MASKITO_DEFAULT_OPTIONS,
            mask: [
                '+',
                '7',
                ' ',
                '(',
                /\d/,
                /\d/,
                /\d/,
                ')',
                ' ',
                /\d/,
                '0',
                /\d/,
                '-',
                /\d/,
                /\d/,
                '-',
                /\d/,
                /\d/,
            ],
        };

        const check = ({
            initialValue,
            addedCharacters,
            expectedNewValue,
        }: {
            initialValue: string;
            addedCharacters: string;
            expectedNewValue: string;
        }): void => {
            const selection: [number, number] = [
                initialValue.length,
                initialValue.length,
            ];
            const maskModel = new MaskModel(
                {
                    selection,
                    value: initialValue,
                },
                phoneMaskitoOptions,
            );

            try {
                maskModel.addCharacters(selection, addedCharacters);
            } finally {
                expect(maskModel.value).toBe(expectedNewValue);
                expect(maskModel.selection).toEqual([
                    expectedNewValue.length,
                    expectedNewValue.length,
                ]);
            }
        };

        it('+7| => Type 7 => +7 (7', () => {
            check({
                initialValue: '+7',
                addedCharacters: '7',
                expectedNewValue: '+7 (7',
            });
        });

        it('+7| => Type 9 => +7 (9', () => {
            check({
                initialValue: '+7',
                addedCharacters: '9',
                expectedNewValue: '+7 (9',
            });
        });

        it('+7 | (space after seven) => Type 7 => +7 (7', () => {
            check({
                initialValue: '+7 ',
                addedCharacters: '7',
                expectedNewValue: '+7 (7',
            });
        });

        it('+7 (7| => Type 7 => +7 (77', () => {
            check({
                initialValue: '+7 (7',
                addedCharacters: '7',
                expectedNewValue: '+7 (77',
            });
        });

        it('+7 (900) 2| (next character is fixed character "0") => Type 1 => +7 (900) 201|', () => {
            check({
                initialValue: '+7 (900) 2',
                addedCharacters: '1',
                expectedNewValue: '+7 (900) 201',
            });
        });

        it('+7 (900) 20| => Type 0 => +7 (900) 200|', () => {
            check({
                initialValue: '+7 (900) 20',
                addedCharacters: '0',
                expectedNewValue: '+7 (900) 200',
            });
        });
    });
});
