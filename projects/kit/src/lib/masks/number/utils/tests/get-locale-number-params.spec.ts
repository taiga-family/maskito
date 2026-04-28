import {describe, expect, it} from '@jest/globals';

import {getLocaleNumberParams} from '../get-locale-number-params';

describe('getLocaleNumberParams', () => {
    describe('thousandSeparator', () => {
        it('en-US: comma', () => {
            expect(getLocaleNumberParams('en-US').thousandSeparator).toBe(',');
        });

        it('en-GB: comma', () => {
            expect(getLocaleNumberParams('en-GB').thousandSeparator).toBe(',');
        });

        it('en-IN: comma', () => {
            expect(getLocaleNumberParams('en-IN').thousandSeparator).toBe(',');
        });

        it('de-DE: dot', () => {
            expect(getLocaleNumberParams('de-DE').thousandSeparator).toBe('.');
        });

        it('pt-BR: dot', () => {
            expect(getLocaleNumberParams('pt-BR').thousandSeparator).toBe('.');
        });

        it('es-ES: dot', () => {
            expect(getLocaleNumberParams('es-ES').thousandSeparator).toBe('.');
        });

        it('it-IT: dot', () => {
            expect(getLocaleNumberParams('it-IT').thousandSeparator).toBe('.');
        });

        it('pl-PL: space-like character', () => {
            expect(getLocaleNumberParams('pl-PL').thousandSeparator).toMatch(/\s/);
        });

        it('fr-FR: space-like character', () => {
            expect(getLocaleNumberParams('fr-FR').thousandSeparator).toMatch(/\s/);
        });

        it('ru-RU: space-like character', () => {
            expect(getLocaleNumberParams('ru-RU').thousandSeparator).toMatch(/\s/);
        });

        it('ja-JP: comma', () => {
            expect(getLocaleNumberParams('ja-JP').thousandSeparator).toBe(',');
        });

        it('zh-CN: comma', () => {
            expect(getLocaleNumberParams('zh-CN').thousandSeparator).toBe(',');
        });

        it('ko-KR: comma', () => {
            expect(getLocaleNumberParams('ko-KR').thousandSeparator).toBe(',');
        });

        it('hi-IN: comma', () => {
            expect(getLocaleNumberParams('hi-IN').thousandSeparator).toBe(',');
        });

        it('ne-NP: comma', () => {
            expect(getLocaleNumberParams('ne-NP').thousandSeparator).toBe(',');
        });

        it('tr-TR: dot', () => {
            expect(getLocaleNumberParams('tr-TR').thousandSeparator).toBe('.');
        });
    });

    describe('decimalSeparator', () => {
        it('en-US: dot', () => {
            expect(getLocaleNumberParams('en-US').decimalSeparator).toBe('.');
        });

        it('en-GB: dot', () => {
            expect(getLocaleNumberParams('en-GB').decimalSeparator).toBe('.');
        });

        it('en-IN: dot', () => {
            expect(getLocaleNumberParams('en-IN').decimalSeparator).toBe('.');
        });

        it('de-DE: comma', () => {
            expect(getLocaleNumberParams('de-DE').decimalSeparator).toBe(',');
        });

        it('pt-BR: comma', () => {
            expect(getLocaleNumberParams('pt-BR').decimalSeparator).toBe(',');
        });

        it('es-ES: comma', () => {
            expect(getLocaleNumberParams('es-ES').decimalSeparator).toBe(',');
        });

        it('it-IT: comma', () => {
            expect(getLocaleNumberParams('it-IT').decimalSeparator).toBe(',');
        });

        it('pl-PL: comma', () => {
            expect(getLocaleNumberParams('pl-PL').decimalSeparator).toBe(',');
        });

        it('fr-FR: comma', () => {
            expect(getLocaleNumberParams('fr-FR').decimalSeparator).toBe(',');
        });

        it('ru-RU: comma', () => {
            expect(getLocaleNumberParams('ru-RU').decimalSeparator).toBe(',');
        });

        it('ja-JP: dot', () => {
            expect(getLocaleNumberParams('ja-JP').decimalSeparator).toBe('.');
        });

        it('zh-CN: dot', () => {
            expect(getLocaleNumberParams('zh-CN').decimalSeparator).toBe('.');
        });

        it('ko-KR: dot', () => {
            expect(getLocaleNumberParams('ko-KR').decimalSeparator).toBe('.');
        });

        it('hi-IN: dot', () => {
            expect(getLocaleNumberParams('hi-IN').decimalSeparator).toBe('.');
        });

        it('tr-TR: comma', () => {
            expect(getLocaleNumberParams('tr-TR').decimalSeparator).toBe(',');
        });
    });

    describe('thousandSeparatorPattern', () => {
        describe('empty string', () => {
            it('returns [] for empty digits', () => {
                const {thousandSeparatorPattern} = getLocaleNumberParams('en-US');

                expect(thousandSeparatorPattern('')).toEqual([]);
            });
        });

        describe('standard 3-digit grouping', () => {
            it('en-US: 7-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberParams('en-US');

                expect(thousandSeparatorPattern('1234567')).toEqual(['1', '234', '567']);
            });

            it('en-US: 6-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberParams('en-US');

                expect(thousandSeparatorPattern('123456')).toEqual(['123', '456']);
            });

            it('en-US: 4-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberParams('en-US');

                expect(thousandSeparatorPattern('1234')).toEqual(['1', '234']);
            });

            it('en-US: 3-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberParams('en-US');

                expect(thousandSeparatorPattern('123')).toEqual(['123']);
            });

            it('en-US: single digit', () => {
                const {thousandSeparatorPattern} = getLocaleNumberParams('en-US');

                expect(thousandSeparatorPattern('5')).toEqual(['5']);
            });

            it('de-DE: 7-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberParams('de-DE');

                expect(thousandSeparatorPattern('1234567')).toEqual(['1', '234', '567']);
            });

            it('fr-FR: 7-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberParams('fr-FR');

                expect(thousandSeparatorPattern('1234567')).toEqual(['1', '234', '567']);
            });

            it('ru-RU: 7-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberParams('ru-RU');

                expect(thousandSeparatorPattern('1234567')).toEqual(['1', '234', '567']);
            });

            it('ja-JP: 7-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberParams('ja-JP');

                expect(thousandSeparatorPattern('1234567')).toEqual(['1', '234', '567']);
            });

            it('zh-CN: 7-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberParams('zh-CN');

                expect(thousandSeparatorPattern('1234567')).toEqual(['1', '234', '567']);
            });

            it('ko-KR: 7-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberParams('ko-KR');

                expect(thousandSeparatorPattern('1234567')).toEqual(['1', '234', '567']);
            });

            it('pt-BR: 7-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberParams('pt-BR');

                expect(thousandSeparatorPattern('1234567')).toEqual(['1', '234', '567']);
            });

            it('tr-TR: 7-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberParams('tr-TR');

                expect(thousandSeparatorPattern('1234567')).toEqual(['1', '234', '567']);
            });

            it('es-ES: 7-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberParams('es-ES');

                expect(thousandSeparatorPattern('1234567')).toEqual(['1', '234', '567']);
            });

            it('es-ES: 4-digit number (no grouping for 4 digits)', () => {
                const {thousandSeparatorPattern} = getLocaleNumberParams('es-ES');

                expect(thousandSeparatorPattern('1234')).toEqual(['1234']);
            });
        });

        describe('Indian 2+3 grouping (last group is 3, subsequent are 2)', () => {
            it('en-IN: 7-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberParams('en-IN');

                expect(thousandSeparatorPattern('1234567')).toEqual(['12', '34', '567']);
            });

            it('en-IN: 5-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberParams('en-IN');

                expect(thousandSeparatorPattern('12345')).toEqual(['12', '345']);
            });

            it('en-IN: 4-digit number (no extra group needed)', () => {
                const {thousandSeparatorPattern} = getLocaleNumberParams('en-IN');

                expect(thousandSeparatorPattern('1234')).toEqual(['1', '234']);
            });

            it('en-IN: 9-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberParams('en-IN');

                expect(thousandSeparatorPattern('123456789')).toEqual([
                    '12',
                    '34',
                    '56',
                    '789',
                ]);
            });

            it('hi-IN: 7-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberParams('hi-IN');

                expect(thousandSeparatorPattern('1234567')).toEqual(['12', '34', '567']);
            });

            it('ne-NP: 7-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberParams('ne-NP');

                expect(thousandSeparatorPattern('1234567')).toEqual(['12', '34', '567']);
            });
        });

        describe('preserves leading zeros in digits', () => {
            it('en-US: leading zeros are kept', () => {
                const {thousandSeparatorPattern} = getLocaleNumberParams('en-US');

                expect(thousandSeparatorPattern('000123')).toEqual(['000', '123']);
            });

            it('en-IN: leading zeros are kept', () => {
                const {thousandSeparatorPattern} = getLocaleNumberParams('en-IN');

                expect(thousandSeparatorPattern('0000567')).toEqual(['00', '00', '567']);
            });
        });
    });
});
