import {describe, expect, it} from '@jest/globals';

import {getLocaleDateInfo} from '../get-locale-date-info';

describe('getLocaleDateInfo', () => {
    describe('mode', () => {
        describe('mm/dd/yyyy (month-first)', () => {
            it('en-US', () => {
                expect(getLocaleDateInfo('en-US').mode).toBe('mm/dd/yyyy');
            });
        });

        describe('dd/mm/yyyy (day-first)', () => {
            it('de-DE', () => {
                expect(getLocaleDateInfo('de-DE').mode).toBe('dd/mm/yyyy');
            });

            it('fr-FR', () => {
                expect(getLocaleDateInfo('fr-FR').mode).toBe('dd/mm/yyyy');
            });

            it('ru-RU', () => {
                expect(getLocaleDateInfo('ru-RU').mode).toBe('dd/mm/yyyy');
            });

            it('en-GB', () => {
                expect(getLocaleDateInfo('en-GB').mode).toBe('dd/mm/yyyy');
            });

            it('it-IT', () => {
                expect(getLocaleDateInfo('it-IT').mode).toBe('dd/mm/yyyy');
            });

            it('es-ES', () => {
                expect(getLocaleDateInfo('es-ES').mode).toBe('dd/mm/yyyy');
            });

            it('pl-PL', () => {
                expect(getLocaleDateInfo('pl-PL').mode).toBe('dd/mm/yyyy');
            });

            it('pt-BR', () => {
                expect(getLocaleDateInfo('pt-BR').mode).toBe('dd/mm/yyyy');
            });

            it('nl-NL', () => {
                expect(getLocaleDateInfo('nl-NL').mode).toBe('dd/mm/yyyy');
            });

            it('tr-TR', () => {
                expect(getLocaleDateInfo('tr-TR').mode).toBe('dd/mm/yyyy');
            });

            it('uk-UA', () => {
                expect(getLocaleDateInfo('uk-UA').mode).toBe('dd/mm/yyyy');
            });

            it('ar-EG', () => {
                expect(getLocaleDateInfo('ar-EG').mode).toBe('dd/mm/yyyy');
            });
        });

        describe('yyyy/mm/dd (year-first)', () => {
            it('zh-CN', () => {
                expect(getLocaleDateInfo('zh-CN').mode).toBe('yyyy/mm/dd');
            });

            it('zh-TW', () => {
                expect(getLocaleDateInfo('zh-TW').mode).toBe('yyyy/mm/dd');
            });

            it('ja-JP', () => {
                expect(getLocaleDateInfo('ja-JP').mode).toBe('yyyy/mm/dd');
            });

            it('ko-KR', () => {
                expect(getLocaleDateInfo('ko-KR').mode).toBe('yyyy/mm/dd');
            });

            it('en-CA', () => {
                expect(getLocaleDateInfo('en-CA').mode).toBe('yyyy/mm/dd');
            });

            it('hu-HU', () => {
                expect(getLocaleDateInfo('hu-HU').mode).toBe('yyyy/mm/dd');
            });

            it('lt-LT', () => {
                expect(getLocaleDateInfo('lt-LT').mode).toBe('yyyy/mm/dd');
            });
        });
    });

    describe('separator', () => {
        it('en-US: slash', () => {
            expect(getLocaleDateInfo('en-US').separator).toBe('/');
        });

        it('en-GB: slash', () => {
            expect(getLocaleDateInfo('en-GB').separator).toBe('/');
        });

        it('fr-FR: slash', () => {
            expect(getLocaleDateInfo('fr-FR').separator).toBe('/');
        });

        it('es-ES: slash', () => {
            expect(getLocaleDateInfo('es-ES').separator).toBe('/');
        });

        it('pt-BR: slash', () => {
            expect(getLocaleDateInfo('pt-BR').separator).toBe('/');
        });

        it('nl-NL: dash', () => {
            expect(getLocaleDateInfo('nl-NL').separator).toBe('-');
        });

        it('zh-CN: slash', () => {
            expect(getLocaleDateInfo('zh-CN').separator).toBe('/');
        });

        it('zh-TW: slash', () => {
            expect(getLocaleDateInfo('zh-TW').separator).toBe('/');
        });

        it('ja-JP: slash', () => {
            expect(getLocaleDateInfo('ja-JP').separator).toBe('/');
        });

        it('de-DE: dot', () => {
            expect(getLocaleDateInfo('de-DE').separator).toBe('.');
        });

        it('ru-RU: dot', () => {
            expect(getLocaleDateInfo('ru-RU').separator).toBe('.');
        });

        it('pl-PL: dot', () => {
            expect(getLocaleDateInfo('pl-PL').separator).toBe('.');
        });

        it('it-IT: slash', () => {
            expect(getLocaleDateInfo('it-IT').separator).toBe('/');
        });

        it('uk-UA: dot', () => {
            expect(getLocaleDateInfo('uk-UA').separator).toBe('.');
        });

        it('tr-TR: dot', () => {
            expect(getLocaleDateInfo('tr-TR').separator).toBe('.');
        });

        it('hu-HU: dot with space', () => {
            expect(getLocaleDateInfo('hu-HU').separator).toBe('. ');
        });
    });
});
