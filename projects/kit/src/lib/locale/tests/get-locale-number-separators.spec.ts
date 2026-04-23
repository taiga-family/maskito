import {describe, expect, it} from '@jest/globals';

import {getLocaleNumberSeparators} from '../get-locale-number-separators';

describe('getLocaleNumberSeparators', () => {
    describe('thousandSeparator', () => {
        it('en-US: comma', () => {
            expect(getLocaleNumberSeparators('en-US').thousandSeparator).toBe(',');
        });

        it('en-GB: comma', () => {
            expect(getLocaleNumberSeparators('en-GB').thousandSeparator).toBe(',');
        });

        it('en-IN: comma', () => {
            expect(getLocaleNumberSeparators('en-IN').thousandSeparator).toBe(',');
        });

        it('de-DE: dot', () => {
            expect(getLocaleNumberSeparators('de-DE').thousandSeparator).toBe('.');
        });

        it('pt-BR: dot', () => {
            expect(getLocaleNumberSeparators('pt-BR').thousandSeparator).toBe('.');
        });

        it('es-ES: dot', () => {
            expect(getLocaleNumberSeparators('es-ES').thousandSeparator).toBe('.');
        });

        it('it-IT: dot', () => {
            expect(getLocaleNumberSeparators('it-IT').thousandSeparator).toBe('.');
        });

        it('pl-PL: space-like character', () => {
            expect(getLocaleNumberSeparators('pl-PL').thousandSeparator).toMatch(/\s/);
        });

        it('fr-FR: space-like character', () => {
            expect(getLocaleNumberSeparators('fr-FR').thousandSeparator).toMatch(/\s/);
        });

        it('ru-RU: space-like character', () => {
            expect(getLocaleNumberSeparators('ru-RU').thousandSeparator).toMatch(/\s/);
        });

        it('ja-JP: comma', () => {
            expect(getLocaleNumberSeparators('ja-JP').thousandSeparator).toBe(',');
        });

        it('zh-CN: comma', () => {
            expect(getLocaleNumberSeparators('zh-CN').thousandSeparator).toBe(',');
        });

        it('ko-KR: comma', () => {
            expect(getLocaleNumberSeparators('ko-KR').thousandSeparator).toBe(',');
        });

        it('hi-IN: comma', () => {
            expect(getLocaleNumberSeparators('hi-IN').thousandSeparator).toBe(',');
        });

        it('ne-NP: comma', () => {
            expect(getLocaleNumberSeparators('ne-NP').thousandSeparator).toBe(',');
        });

        it('tr-TR: dot', () => {
            expect(getLocaleNumberSeparators('tr-TR').thousandSeparator).toBe('.');
        });
    });

    describe('decimalSeparator', () => {
        it('en-US: dot', () => {
            expect(getLocaleNumberSeparators('en-US').decimalSeparator).toBe('.');
        });

        it('en-GB: dot', () => {
            expect(getLocaleNumberSeparators('en-GB').decimalSeparator).toBe('.');
        });

        it('en-IN: dot', () => {
            expect(getLocaleNumberSeparators('en-IN').decimalSeparator).toBe('.');
        });

        it('de-DE: comma', () => {
            expect(getLocaleNumberSeparators('de-DE').decimalSeparator).toBe(',');
        });

        it('pt-BR: comma', () => {
            expect(getLocaleNumberSeparators('pt-BR').decimalSeparator).toBe(',');
        });

        it('es-ES: comma', () => {
            expect(getLocaleNumberSeparators('es-ES').decimalSeparator).toBe(',');
        });

        it('it-IT: comma', () => {
            expect(getLocaleNumberSeparators('it-IT').decimalSeparator).toBe(',');
        });

        it('pl-PL: comma', () => {
            expect(getLocaleNumberSeparators('pl-PL').decimalSeparator).toBe(',');
        });

        it('fr-FR: comma', () => {
            expect(getLocaleNumberSeparators('fr-FR').decimalSeparator).toBe(',');
        });

        it('ru-RU: comma', () => {
            expect(getLocaleNumberSeparators('ru-RU').decimalSeparator).toBe(',');
        });

        it('ja-JP: dot', () => {
            expect(getLocaleNumberSeparators('ja-JP').decimalSeparator).toBe('.');
        });

        it('zh-CN: dot', () => {
            expect(getLocaleNumberSeparators('zh-CN').decimalSeparator).toBe('.');
        });

        it('ko-KR: dot', () => {
            expect(getLocaleNumberSeparators('ko-KR').decimalSeparator).toBe('.');
        });

        it('hi-IN: dot', () => {
            expect(getLocaleNumberSeparators('hi-IN').decimalSeparator).toBe('.');
        });

        it('tr-TR: comma', () => {
            expect(getLocaleNumberSeparators('tr-TR').decimalSeparator).toBe(',');
        });
    });

    describe('thousandSeparatorPattern', () => {
        describe('falls back to DEFAULT_THOUSAND_SEPARATOR_PATTERN when locale has no grouping', () => {
            it('en-US without grouping: still returns 3-digit pattern', () => {
                const {thousandSeparatorPattern} = getLocaleNumberSeparators('en-US');

                // Same result as the default regex-based pattern
                expect(thousandSeparatorPattern('1234567')).toEqual(['1', '234', '567']);
            });
        });

        describe('empty string', () => {
            it('returns [] for empty digits', () => {
                const {thousandSeparatorPattern} = getLocaleNumberSeparators('en-US');

                expect(thousandSeparatorPattern('')).toEqual([]);
            });
        });

        describe('standard 3-digit grouping', () => {
            it('en-US: 7-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberSeparators('en-US');

                expect(thousandSeparatorPattern('1234567')).toEqual(['1', '234', '567']);
            });

            it('en-US: 6-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberSeparators('en-US');

                expect(thousandSeparatorPattern('123456')).toEqual(['123', '456']);
            });

            it('en-US: 4-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberSeparators('en-US');

                expect(thousandSeparatorPattern('1234')).toEqual(['1', '234']);
            });

            it('en-US: 3-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberSeparators('en-US');

                expect(thousandSeparatorPattern('123')).toEqual(['123']);
            });

            it('en-US: single digit', () => {
                const {thousandSeparatorPattern} = getLocaleNumberSeparators('en-US');

                expect(thousandSeparatorPattern('5')).toEqual(['5']);
            });

            it('de-DE: 7-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberSeparators('de-DE');

                expect(thousandSeparatorPattern('1234567')).toEqual(['1', '234', '567']);
            });

            it('fr-FR: 7-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberSeparators('fr-FR');

                expect(thousandSeparatorPattern('1234567')).toEqual(['1', '234', '567']);
            });

            it('ru-RU: 7-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberSeparators('ru-RU');

                expect(thousandSeparatorPattern('1234567')).toEqual(['1', '234', '567']);
            });

            it('ja-JP: 7-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberSeparators('ja-JP');

                expect(thousandSeparatorPattern('1234567')).toEqual(['1', '234', '567']);
            });

            it('zh-CN: 7-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberSeparators('zh-CN');

                expect(thousandSeparatorPattern('1234567')).toEqual(['1', '234', '567']);
            });

            it('ko-KR: 7-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberSeparators('ko-KR');

                expect(thousandSeparatorPattern('1234567')).toEqual(['1', '234', '567']);
            });

            it('pt-BR: 7-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberSeparators('pt-BR');

                expect(thousandSeparatorPattern('1234567')).toEqual(['1', '234', '567']);
            });

            it('tr-TR: 7-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberSeparators('tr-TR');

                expect(thousandSeparatorPattern('1234567')).toEqual(['1', '234', '567']);
            });

            it('es-ES: 7-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberSeparators('es-ES');

                expect(thousandSeparatorPattern('1234567')).toEqual(['1', '234', '567']);
            });
        });

        describe('Indian 2+3 grouping (last group is 3, subsequent are 2)', () => {
            it('en-IN: 7-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberSeparators('en-IN');

                expect(thousandSeparatorPattern('1234567')).toEqual(['12', '34', '567']);
            });

            it('en-IN: 5-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberSeparators('en-IN');

                expect(thousandSeparatorPattern('12345')).toEqual(['12', '345']);
            });

            it('en-IN: 4-digit number (no extra group needed)', () => {
                const {thousandSeparatorPattern} = getLocaleNumberSeparators('en-IN');

                expect(thousandSeparatorPattern('1234')).toEqual(['1', '234']);
            });

            it('en-IN: 9-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberSeparators('en-IN');

                expect(thousandSeparatorPattern('123456789')).toEqual([
                    '12',
                    '34',
                    '56',
                    '789',
                ]);
            });

            it('hi-IN: 7-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberSeparators('hi-IN');

                expect(thousandSeparatorPattern('1234567')).toEqual(['12', '34', '567']);
            });

            it('ne-NP: 7-digit number', () => {
                const {thousandSeparatorPattern} = getLocaleNumberSeparators('ne-NP');

                expect(thousandSeparatorPattern('1234567')).toEqual(['12', '34', '567']);
            });
        });

        describe('preserves leading zeros in digits', () => {
            it('en-US: leading zeros are kept', () => {
                const {thousandSeparatorPattern} = getLocaleNumberSeparators('en-US');

                expect(thousandSeparatorPattern('000123')).toEqual(['000', '123']);
            });

            it('en-IN: leading zeros are kept', () => {
                const {thousandSeparatorPattern} = getLocaleNumberSeparators('en-IN');

                expect(thousandSeparatorPattern('0000567')).toEqual(['00', '00', '567']);
            });
        });
    });
});
