import {describe, expect, it} from '@jest/globals';

import {getLocaleDateParams} from '../get-locale-date-params';

describe('getLocaleDateParams', () => {
    describe('mode', () => {
        it('lt-LT: yyyy/mm/dd', () => {
            expect(getLocaleDateParams('lt-LT').mode).toBe('yyyy/mm/dd');
        });

        it('en-US: mm/dd/yyyy', () => {
            expect(getLocaleDateParams('en-US').mode).toBe('mm/dd/yyyy');
        });

        it('en-GB: dd/mm/yyyy', () => {
            expect(getLocaleDateParams('en-GB').mode).toBe('dd/mm/yyyy');
        });

        it('de-DE: dd/mm/yyyy', () => {
            expect(getLocaleDateParams('de-DE').mode).toBe('dd/mm/yyyy');
        });

        it('fr-FR: dd/mm/yyyy', () => {
            expect(getLocaleDateParams('fr-FR').mode).toBe('dd/mm/yyyy');
        });

        it('ja-JP: yyyy/mm/dd', () => {
            expect(getLocaleDateParams('ja-JP').mode).toBe('yyyy/mm/dd');
        });

        it('zh-CN: yyyy/mm/dd', () => {
            expect(getLocaleDateParams('zh-CN').mode).toBe('yyyy/mm/dd');
        });
    });

    describe('separator', () => {
        it('lt-LT: hyphen', () => {
            expect(getLocaleDateParams('lt-LT').separator).toBe('-');
        });

        it('en-US: slash', () => {
            expect(getLocaleDateParams('en-US').separator).toBe('/');
        });

        it('de-DE: dot', () => {
            expect(getLocaleDateParams('de-DE').separator).toBe('.');
        });

        it('ja-JP: slash', () => {
            expect(getLocaleDateParams('ja-JP').separator).toBe('/');
        });

        it('sl-SI: dot with space (multi-character separator)', () => {
            expect(getLocaleDateParams('sl-SI').separator).toBe('. ');
        });
    });
});
