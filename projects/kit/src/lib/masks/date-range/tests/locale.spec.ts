import {describe, expect, it} from '@jest/globals';
import {maskitoTransform} from '@maskito/core';
import {maskitoDateRange} from '@maskito/kit';

import {CHAR_EN_DASH, CHAR_NO_BREAK_SPACE} from '../../../constants';

const RANGE_SEP = `${CHAR_NO_BREAK_SPACE}${CHAR_EN_DASH}${CHAR_NO_BREAK_SPACE}`;

describe('maskitoDateRange with locale', () => {
    describe('infers mode and dateSeparator from locale', () => {
        it('en-US uses mm/dd/yyyy with slash', () => {
            const options = maskitoDateRange({locale: 'en-US'});
            const result = maskitoTransform('01202020', options);

            expect(result).toBe('01/20/2020');
        });

        it('de-DE uses dd.mm.yyyy with dot', () => {
            const options = maskitoDateRange({locale: 'de-DE'});
            const result = maskitoTransform('21102005', options);

            expect(result).toBe('21.10.2005');
        });

        it('lt-LT uses yyyy-mm-dd with hyphen', () => {
            const options = maskitoDateRange({locale: 'lt-LT'});
            const result = maskitoTransform('20051021', options);

            expect(result).toBe('2005-10-21');
        });
    });

    describe('infers mode and dateSeparator from locale (end-range date)', () => {
        it('en-US formats end-range date with slash', () => {
            const options = maskitoDateRange({locale: 'en-US'});
            const result = maskitoTransform(`01202020${RANGE_SEP}01302021`, options);

            expect(result).toBe(`01/20/2020${RANGE_SEP}01/30/2021`);
        });

        it('de-DE formats end-range date with dot', () => {
            const options = maskitoDateRange({locale: 'de-DE'});
            const result = maskitoTransform(`21102005${RANGE_SEP}31122006`, options);

            expect(result).toBe(`21.10.2005${RANGE_SEP}31.12.2006`);
        });

        it('lt-LT formats end-range date with hyphen', () => {
            const options = maskitoDateRange({locale: 'lt-LT'});
            const result = maskitoTransform(`20051021${RANGE_SEP}20061231`, options);

            expect(result).toBe(`2005-10-21${RANGE_SEP}2006-12-31`);
        });
    });

    describe('explicit mode overrides locale mode but keeps locale dateSeparator', () => {
        it('en-US with mode dd/mm/yyyy uses slash from locale', () => {
            const options = maskitoDateRange({locale: 'en-US', mode: 'dd/mm/yyyy'});
            const result = maskitoTransform('21102005', options);

            expect(result).toBe('21/10/2005');
        });

        it('de-DE with mode yyyy/mm/dd uses dot from locale', () => {
            const options = maskitoDateRange({locale: 'de-DE', mode: 'yyyy/mm/dd'});
            const result = maskitoTransform('20051021', options);

            expect(result).toBe('2005.10.21');
        });

        it('lt-LT with mode dd/mm/yyyy uses hyphen from locale', () => {
            const options = maskitoDateRange({locale: 'lt-LT', mode: 'dd/mm/yyyy'});
            const result = maskitoTransform('21102005', options);

            expect(result).toBe('21-10-2005');
        });
    });

    describe('explicit mode overrides locale mode but keeps locale dateSeparator (end-range date)', () => {
        it('en-US with mode dd/mm/yyyy formats end-range date with slash', () => {
            const options = maskitoDateRange({locale: 'en-US', mode: 'dd/mm/yyyy'});
            const result = maskitoTransform(`21102005${RANGE_SEP}31122006`, options);

            expect(result).toBe(`21/10/2005${RANGE_SEP}31/12/2006`);
        });

        it('lt-LT with mode dd/mm/yyyy formats end-range date with hyphen', () => {
            const options = maskitoDateRange({locale: 'lt-LT', mode: 'dd/mm/yyyy'});
            const result = maskitoTransform(`21102005${RANGE_SEP}31122006`, options);

            expect(result).toBe(`21-10-2005${RANGE_SEP}31-12-2006`);
        });
    });

    describe('explicit dateSeparator overrides locale dateSeparator', () => {
        it('de-DE with dateSeparator "/" overrides dot', () => {
            const options = maskitoDateRange({locale: 'de-DE', dateSeparator: '/'});
            const result = maskitoTransform('21102005', options);

            expect(result).toBe('21/10/2005');
        });

        it('en-US with dateSeparator "." overrides slash', () => {
            const options = maskitoDateRange({locale: 'en-US', dateSeparator: '.'});
            const result = maskitoTransform('01202020', options);

            expect(result).toBe('01.20.2020');
        });
    });

    describe('explicit mode and dateSeparator both override locale', () => {
        it('lt-LT with mode mm/dd/yyyy and dateSeparator "." overrides both', () => {
            const options = maskitoDateRange({
                locale: 'lt-LT',
                mode: 'mm/dd/yyyy',
                dateSeparator: '.',
            });

            const result = maskitoTransform('10212005', options);

            expect(result).toBe('10.21.2005');
        });
    });
});
