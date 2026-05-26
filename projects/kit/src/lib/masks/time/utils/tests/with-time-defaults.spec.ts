import {describe, expect, it} from '@jest/globals';

import {withTimeDefaults} from '../with-time-defaults';

describe('withTimeDefaults', () => {
    describe('separators resolution', () => {
        it('fills missing positions with canonical separators from mode', () => {
            expect(
                withTimeDefaults({mode: 'HH:MM:SS.MSS', separators: []}).separators,
            ).toEqual([':', ':', '.']);
        });

        it('falls back per-position when user array is shorter than mode', () => {
            expect(
                withTimeDefaults({mode: 'HH:MM:SS.MSS', separators: ['.']}).separators,
            ).toEqual(['.', ':', '.']);
        });

        it('uses user-provided separators when array fully covers mode', () => {
            expect(
                withTimeDefaults({
                    mode: 'HH:MM:SS',
                    separators: [' h ', ' min '],
                }).separators,
            ).toEqual([' h ', ' min ']);
        });

        it('defaults to canonical separators when no separators provided', () => {
            expect(withTimeDefaults({mode: 'HH:MM:SS.MSS'}).separators).toEqual([
                ':',
                ':',
                '.',
            ]);
        });

        it('ignores meridiem part when computing canonical separators', () => {
            expect(withTimeDefaults({mode: 'HH:MM AA'}).separators).toEqual([':']);
        });

        it('returns empty array for mode without any separator slot', () => {
            expect(withTimeDefaults({mode: 'HH'}).separators).toEqual([]);
            expect(withTimeDefaults({mode: 'HH AA'}).separators).toEqual([]);
        });
    });
});
