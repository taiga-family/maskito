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

    describe('dayPeriod resolution', () => {
        it("defaults to ['', ''] for 24-hour mode without explicit dayPeriod", () => {
            expect(withTimeDefaults({mode: 'HH:MM'}).dayPeriod).toEqual(['', '']);
        });

        it("defaults to ['AM', 'PM'] for deprecated 'AA' mode (backward compat)", () => {
            expect(withTimeDefaults({mode: 'HH:MM AA'}).dayPeriod).toEqual(['AM', 'PM']);
            expect(
                withTimeDefaults({mode: 'HH:MM AA', dayPeriod: ['', '']}).dayPeriod,
            ).toEqual(['AM', 'PM']);
        });

        it('treats explicit dayPeriod as 12-hour for time-segment bounds', () => {
            const result = withTimeDefaults({
                mode: 'HH:MM',
                dayPeriod: ['AM', 'PM'],
            });

            expect(result.timeSegmentMinValues.hours).toBe(1);
            expect(result.timeSegmentMaxValues.hours).toBe(12);
        });

        it("treats empty dayPeriod ['', ''] as 24-hour for time-segment bounds", () => {
            const result = withTimeDefaults({
                mode: 'HH:MM',
                dayPeriod: ['', ''],
            });

            expect(result.timeSegmentMinValues.hours).toBe(0);
            expect(result.timeSegmentMaxValues.hours).toBe(23);
        });
    });
});
