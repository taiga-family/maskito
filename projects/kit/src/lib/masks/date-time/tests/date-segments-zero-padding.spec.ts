import type {MaskitoOptions} from '@maskito/core';
import {MASKITO_DEFAULT_OPTIONS, maskitoTransform} from '@maskito/core';
import {maskitoDateTimeOptionsGenerator} from '@maskito/kit';

describe('DateTime (maskitoTransform) | Date segments zero padding', () => {
    describe('[dateMode]="dd/mm/yyyy" & [timeMode]="HH:MM:SS.MSS"', () => {
        let options: MaskitoOptions = MASKITO_DEFAULT_OPTIONS;

        beforeEach(() => {
            options = maskitoDateTimeOptionsGenerator({
                dateMode: 'dd/mm/yyyy',
                timeMode: 'HH:MM:SS.MSS',
                dateSeparator: '/',
            });
        });

        describe('pads digits with zero if date segment exceeds its max possible value', () => {
            describe('pads digit > 1 with zero for months', () => {
                [0, 1].forEach(digit => {
                    it(`01/${digit} => 01/${digit}`, () => {
                        expect(maskitoTransform(`01${digit}`, options)).toBe(
                            `01/${digit}`,
                        );
                    });
                });

                [2, 3, 4, 5, 6, 7, 8, 9].forEach(digit => {
                    it(`01/${digit} => 01/0${digit}`, () => {
                        expect(maskitoTransform(`01${digit}`, options)).toBe(
                            `01/0${digit}`,
                        );
                    });
                });
            });

            describe('pads digit > 3 with zero for days', () => {
                [0, 1, 2, 3].forEach(digit => {
                    it(`${digit} => ${digit}`, () => {
                        expect(maskitoTransform(`${digit}`, options)).toBe(`${digit}`);
                    });
                });

                [4, 5, 6, 7, 8, 9].forEach(digit => {
                    it(`${digit} => 0${digit}`, () => {
                        expect(maskitoTransform(`${digit}`, options)).toBe(`0${digit}`);
                    });
                });
            });
        });
    });
});
