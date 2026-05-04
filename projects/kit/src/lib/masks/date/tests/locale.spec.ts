import {describe, expect, it} from '@jest/globals';
import {maskitoTransform} from '@maskito/core';
import {maskitoDate} from '@maskito/kit';

describe('maskitoDate with locale', () => {
    describe('infers mode and separator from locale', () => {
        it('en-US uses mm/dd/yyyy with slash', () => {
            const options = maskitoDate({locale: 'en-US'});
            const result = maskitoTransform('01202020', options);

            expect(result).toBe('01/20/2020');
        });

        it('de-DE uses dd.mm.yyyy with dot', () => {
            const options = maskitoDate({locale: 'de-DE'});
            const result = maskitoTransform('21102005', options);

            expect(result).toBe('21.10.2005');
        });

        it('lt-LT uses yyyy-mm-dd with hyphen', () => {
            const options = maskitoDate({locale: 'lt-LT'});
            const result = maskitoTransform('20051021', options);

            expect(result).toBe('2005-10-21');
        });
    });

    describe('explicit mode overrides locale mode but keeps locale separator', () => {
        it('en-US with mode dd/mm/yyyy uses slash from locale', () => {
            const options = maskitoDate({locale: 'en-US', mode: 'dd/mm/yyyy'});
            const result = maskitoTransform('21102005', options);

            expect(result).toBe('21/10/2005');
        });

        it('de-DE with mode yyyy/mm/dd uses dot from locale', () => {
            const options = maskitoDate({locale: 'de-DE', mode: 'yyyy/mm/dd'});
            const result = maskitoTransform('20051021', options);

            expect(result).toBe('2005.10.21');
        });

        it('lt-LT with mode dd/mm/yyyy uses hyphen from locale', () => {
            const options = maskitoDate({locale: 'lt-LT', mode: 'dd/mm/yyyy'});
            const result = maskitoTransform('21102005', options);

            expect(result).toBe('21-10-2005');
        });
    });

    describe('explicit separator overrides locale separator', () => {
        it('de-DE with separator "/" overrides dot', () => {
            const options = maskitoDate({locale: 'de-DE', separator: '/'});
            const result = maskitoTransform('21102005', options);

            expect(result).toBe('21/10/2005');
        });

        it('en-US with separator "." overrides slash', () => {
            const options = maskitoDate({locale: 'en-US', separator: '.'});
            const result = maskitoTransform('01202020', options);

            expect(result).toBe('01.20.2020');
        });
    });

    describe('explicit mode and separator both override locale', () => {
        it('lt-LT with mode mm/dd/yyyy and separator "." overrides both', () => {
            const options = maskitoDate({
                locale: 'lt-LT',
                mode: 'mm/dd/yyyy',
                separator: '.',
            });

            const result = maskitoTransform('10212005', options);

            expect(result).toBe('10.21.2005');
        });
    });
});
