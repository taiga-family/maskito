import {describe, expect, it} from '@jest/globals';

import type {MaskitoOptions} from '../../types';
import {maskitoTransform} from '../transform';

describe('maskitoTransform', () => {
    const numberOptions: MaskitoOptions = {
        mask: /^\d+(,\d*)?$/,
        preprocessors: [
            ({elementState, data}) => {
                const {value, selection} = elementState;

                return {
                    elementState: {
                        selection,
                        value: value.replace('.', ','),
                    },
                    data: data.replace('.', ','),
                };
            },
        ],
        postprocessors: [
            ({value, selection}) => {
                const newValue = value.replace(/^0+/, '0');
                const deletedChars = value.length - newValue.length;
                const [from, to] = selection;

                return {
                    value: newValue,
                    selection: [from - deletedChars, to - deletedChars],
                };
            },
        ],
    };
    const usPhoneOptions: MaskitoOptions = {
        mask: [
            '+',
            '1',
            ' ',
            '(',
            /\d/,
            /\d/,
            /\d/,
            ')',
            ' ',
            /\d/,
            /\d/,
            /\d/,
            '-',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
        ],
    };

    describe('Basic API', () => {
        it('returns string if the first argument is a string', () => {
            expect(typeof maskitoTransform('100', numberOptions)).toBe('string');
        });

        it('returns ElementState if the first argument is a ElementState', () => {
            const res = maskitoTransform({value: '', selection: [0, 0]}, numberOptions);

            expect(res).toBeTruthy();
            expect(typeof res).toBe('object');
        });

        it('formats value using preprocessor', () => {
            expect(maskitoTransform('100.42', numberOptions)).toBe('100,42');
            expect(
                maskitoTransform(
                    {
                        value: '100.42',
                        selection: [2, 2],
                    },
                    numberOptions,
                ),
            ).toEqual({value: '100,42', selection: [2, 2]});
        });

        it('formats value using postprocessor', () => {
            expect(maskitoTransform('0000,1234', numberOptions)).toBe('0,1234');
            expect(
                maskitoTransform(
                    {
                        value: '0000,1234',
                        selection: [6, 6],
                    },
                    numberOptions,
                ),
            ).toEqual({value: '0,1234', selection: [3, 3]});
        });

        it('drops invalid characters (mask expression works)', () => {
            expect(maskitoTransform('42Taiga UI42', numberOptions)).toBe('4242');
            expect(
                maskitoTransform(
                    {
                        value: '42Taiga UI42',
                        selection: [11, 11],
                    },
                    numberOptions,
                ),
            ).toEqual({value: '4242', selection: [3, 3]});
        });
    });

    describe('Drop / Browser autofill cases', () => {
        it('US Phone mask | Drops "+1(21"', () => {
            expect(maskitoTransform('+1(21', usPhoneOptions)).toBe('+1 (21');
        });
    });
});
