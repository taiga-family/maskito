import {describe, expect, it} from '@jest/globals';

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
                maskModel.addCharacters(addedCharacters);
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

    describe('Attempt to insert invalid characters for `overwriteMode: replace`', () => {
        describe('mask expression contains leading characters – ["$", /d/, /d/]', () => {
            const options: Required<MaskitoOptions> = {
                ...MASKITO_DEFAULT_OPTIONS,
                mask: ['$', /\d/, /\d/],
                overwriteMode: 'replace',
            };

            it('$1|2 => Type A => $1|2', () => {
                const value = '$12';
                const selection = [2, 2] as const;
                const maskModel = new MaskModel({value, selection}, options);

                expect(() => maskModel.addCharacters('q')).toThrow();
                expect(maskModel.value).toBe(value);
                expect(maskModel.selection).toEqual(selection);
            });

            it('$|12 => Type $ => $|12', () => {
                const value = '$12';
                const selection = [1, 1] as const;
                const maskModel = new MaskModel({value, selection}, options);

                expect(() => maskModel.addCharacters('$')).toThrow();
                expect(maskModel.value).toBe(value);
                expect(maskModel.selection).toEqual(selection);
            });

            it('$|12 => Type X => $|12', () => {
                const value = '$12';
                const selection = [1, 1] as const;
                const maskModel = new MaskModel({value, selection}, options);

                expect(() => maskModel.addCharacters('X')).toThrow();
                expect(maskModel.value).toBe(value);
                expect(maskModel.selection).toEqual(selection);
            });
        });
    });

    describe('Dynamic mask expression + trailing fixed character', () => {
        const postfix = 'left';
        const timeMask: ReadonlyArray<RegExp | string> = [/\d/, /\d/, ':', /\d/, /\d/];
        const timeWithPostfixMask: Required<MaskitoOptions> = {
            ...MASKITO_DEFAULT_OPTIONS,
            mask: ({value}) => {
                let digitsCount = Math.min(value.replaceAll(/\D/g, '').length, 4);
                const afterLastDigit =
                    timeMask.findIndex((x) => typeof x !== 'string' && !--digitsCount) +
                    1;

                return afterLastDigit
                    ? timeMask.slice(0, afterLastDigit).concat(...postfix)
                    : [];
            },
            overwriteMode: 'replace',
        };

        it('adds trailing postfix on enter of digit inside empty textfield', () => {
            const maskModel = new MaskModel(
                {
                    selection: [0, 0],
                    value: '',
                },
                timeWithPostfixMask,
            );

            maskModel.addCharacters('1');

            expect(maskModel.value).toBe('1left');
            expect(maskModel.selection).toEqual([1, 1]);
        });

        it('adds trailing postfix on paste of many digits inside empty textfield', () => {
            const maskModel = new MaskModel(
                {
                    selection: [0, 0],
                    value: '',
                },
                timeWithPostfixMask,
            );

            maskModel.addCharacters('123');

            expect(maskModel.value).toBe('12:3left');
            expect(maskModel.selection).toEqual(['12:3'.length, '12:3'.length]);
        });

        it('edits digit in the middle', () => {
            const maskModel = new MaskModel(
                {
                    selection: [1, 1],
                    value: '12:3left',
                },
                timeWithPostfixMask,
            );

            maskModel.addCharacters('4');

            expect(maskModel.value).toBe('14:3left');
            expect(maskModel.selection).toEqual([3, 3]);
        });

        it('erases the last digit without losing trailing fixed characters', () => {
            const maskModel = new MaskModel(
                {
                    selection: [3, 4],
                    value: '12:3left',
                },
                timeWithPostfixMask,
            );

            maskModel.deleteCharacters();

            expect(maskModel.value).toBe('12left');
            expect(maskModel.selection).toEqual([2, 2]);
        });

        it('erases the digit in the middle without losing trailing fixed character', () => {
            const maskModel = new MaskModel(
                {
                    selection: [3, 4],
                    value: '12:34 left',
                },
                timeWithPostfixMask,
            );

            maskModel.deleteCharacters();

            expect(maskModel.value).toBe('12:4left');
            expect(maskModel.selection).toEqual([3, 3]);
        });
    });

    it('attempt to enter invalid character at the position of fixed character', () => {
        const dateMask: Required<MaskitoOptions> = {
            ...MASKITO_DEFAULT_OPTIONS,
            mask: [/\d/, /\d/, '.', /\d/, /\d/],
        };

        const selection = [2, 2] as const;
        const maskModel = new MaskModel(
            {
                selection,
                value: '12',
            },
            dateMask,
        );

        expect(() => maskModel.addCharacters('#')).toThrow();
        expect(maskModel.value).toBe('12');
        expect(maskModel.selection).toEqual(selection);
    });
});
