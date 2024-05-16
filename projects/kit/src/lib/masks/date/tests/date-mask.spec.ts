/**
 * If any of these tests fail,
 * it can mean that browser autofill or composition are not working properly
 * for Date mask
 */
import {beforeEach, describe, expect, it} from '@jest/globals';
import type {MaskitoOptions} from '@maskito/core';
import {MASKITO_DEFAULT_OPTIONS, maskitoTransform} from '@maskito/core';
import {maskitoDateOptionsGenerator} from '@maskito/kit';

describe('Date (maskitoTransform)', () => {
    describe('[mode]="yyyy/mm/dd"', () => {
        let options: MaskitoOptions = MASKITO_DEFAULT_OPTIONS;

        beforeEach(() => {
            options = maskitoDateOptionsGenerator({
                mode: 'yyyy/mm/dd',
                separator: '/',
            });
        });

        describe('pads digits with zero if date segment exceeds its max possible value', () => {
            describe('pads digit > 1 with zero for months', () => {
                [0, 1].forEach(digit => {
                    it(`1234/${digit} => 1234/${digit}`, () => {
                        expect(maskitoTransform(`1234${digit}`, options)).toBe(
                            `1234/${digit}`,
                        );
                        expect(maskitoTransform(`1234/${digit}`, options)).toBe(
                            `1234/${digit}`,
                        );
                    });
                });

                [2, 3, 4, 5, 6, 7, 8, 9].forEach(digit => {
                    it(`1234/${digit} => 1234/0${digit}`, () => {
                        expect(maskitoTransform(`1234${digit}`, options)).toBe(
                            `1234/0${digit}`,
                        );
                        expect(maskitoTransform(`1234/${digit}`, options)).toBe(
                            `1234/0${digit}`,
                        );
                    });
                });
            });

            describe('pads digit > 3 with zero for days', () => {
                [0, 1, 2, 3].forEach(digit => {
                    it(`1234/12/${digit} => 1234/12/${digit}`, () => {
                        expect(maskitoTransform(`123412${digit}`, options)).toBe(
                            `1234/12/${digit}`,
                        );
                        expect(maskitoTransform(`1234/12/${digit}`, options)).toBe(
                            `1234/12/${digit}`,
                        );
                    });
                });

                [4, 5, 6, 7, 8, 9].forEach(digit => {
                    it(`1234/12/${digit} => 1234/12/0${digit}`, () => {
                        expect(maskitoTransform(`123412${digit}`, options)).toBe(
                            `1234/12/0${digit}`,
                        );
                        expect(maskitoTransform(`1234/12/${digit}`, options)).toBe(
                            `1234/12/0${digit}`,
                        );
                    });
                });
            });
        });

        it('accepts full width characters', () => {
            expect(maskitoTransform('１２３４５', options)).toBe('1234/05');
            expect(maskitoTransform('１２３４１２２６', options)).toBe('1234/12/26');
        });
    });
});
