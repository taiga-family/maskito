import {describe, expect, it} from '@jest/globals';
import {maskitoStringifyTime, type MaskitoTimeMode} from '@maskito/kit';

describe('maskitoStringifyTime', () => {
    const testCases = new Map<MaskitoTimeMode, Array<{ms: number; text: string}>>([
        [
            'HH:MM:SS.MSS',
            [
                {ms: 0, text: '00:00:00.000'},
                {ms: 3661001, text: '01:01:01.001'},
                {ms: 45296789, text: '12:34:56.789'},
                {ms: 86399999, text: '23:59:59.999'},
            ],
        ],
        [
            'HH:MM:SS.MSS AA',
            [
                {ms: 0, text: '12:00:00.000\u00A0AM'},
                {ms: 3600000, text: '01:00:00.000\u00A0AM'},
                {ms: 43199999, text: '11:59:59.999\u00A0AM'},
                {ms: 43200000, text: '12:00:00.000\u00A0PM'},
                {ms: 46800000, text: '01:00:00.000\u00A0PM'},
                {ms: 86399999, text: '11:59:59.999\u00A0PM'},
            ],
        ],
        [
            'HH:MM:SS',
            [
                {ms: 0, text: '00:00:00'},
                {ms: 3661000, text: '01:01:01'},
                {ms: 10920000, text: '03:02:00'},
                {ms: 45296000, text: '12:34:56'},
                {ms: 86399000, text: '23:59:59'},
            ],
        ],
        [
            'HH:MM:SS AA',
            [
                {ms: 0, text: '12:00:00\u00A0AM'},
                {ms: 3600000, text: '01:00:00\u00A0AM'},
                {ms: 43199000, text: '11:59:59\u00A0AM'},
                {ms: 43200000, text: '12:00:00\u00A0PM'},
                {ms: 46800000, text: '01:00:00\u00A0PM'},
                {ms: 86399000, text: '11:59:59\u00A0PM'},
            ],
        ],
        [
            'HH:MM',
            [
                {ms: 0, text: '00:00'},
                {ms: 3660000, text: '01:01'},
                {ms: 45240000, text: '12:34'},
                {ms: 86340000, text: '23:59'},
            ],
        ],
        [
            'HH:MM AA',
            [
                {ms: 0, text: '12:00\u00A0AM'},
                {ms: 3600000, text: '01:00\u00A0AM'},
                {ms: 43140000, text: '11:59\u00A0AM'},
                {ms: 43200000, text: '12:00\u00A0PM'},
                {ms: 46800000, text: '01:00\u00A0PM'},
                {ms: 86340000, text: '11:59\u00A0PM'},
            ],
        ],
        [
            'HH',
            [
                {ms: 0, text: '00'},
                {ms: 3600000, text: '01'},
                {ms: 43200000, text: '12'},
                {ms: 82800000, text: '23'},
            ],
        ],
        [
            'HH AA',
            [
                {ms: 0, text: '12\u00A0AM'},
                {ms: 3600000, text: '01\u00A0AM'},
                {ms: 39600000, text: '11\u00A0AM'},
                {ms: 43200000, text: '12\u00A0PM'},
                {ms: 46800000, text: '01\u00A0PM'},
                {ms: 82800000, text: '11\u00A0PM'},
            ],
        ],
        [
            'MM:SS.MSS',
            [
                {ms: 0, text: '00:00.000'},
                {ms: 61001, text: '01:01.001'},
                {ms: 754567, text: '12:34.567'},
                {ms: 3599999, text: '59:59.999'},
            ],
        ],
        [
            'MM:SS',
            [
                {ms: 0, text: '00:00'},
                {ms: 60000, text: '01:00'},
                {ms: 600000, text: '10:00'},
                {ms: 750000, text: '12:30'},
            ],
        ],
        [
            'SS.MSS',
            [
                {ms: 0, text: '00.000'},
                {ms: 1001, text: '01.001'},
                {ms: 12345, text: '12.345'},
                {ms: 59999, text: '59.999'},
            ],
        ],
    ]);

    testCases.forEach((cases, mode) => {
        describe(`mode ${mode}`, () => {
            cases.forEach(({ms, text}) => {
                it(`${ms}ms => '${text}'`, () => {
                    expect(maskitoStringifyTime(ms, {mode})).toBe(text);
                });
            });
        });
    });

    describe('with custom separators', () => {
        it('uses dot separator from params', () => {
            expect(
                maskitoStringifyTime(14 * 60 * 60 * 1000 + 30 * 60 * 1000, {
                    mode: 'HH:MM',
                    separators: ['.'],
                }),
            ).toBe('14.30');
        });

        it('preserves colon separator by default', () => {
            expect(
                maskitoStringifyTime(14 * 60 * 60 * 1000 + 30 * 60 * 1000, {
                    mode: 'HH:MM',
                }),
            ).toBe('14:30');
        });

        it('uses dot separator with HH:MM:SS mode (both positions)', () => {
            expect(
                maskitoStringifyTime(14 * 60 * 60 * 1000 + 30 * 60 * 1000 + 45 * 1000, {
                    mode: 'HH:MM:SS',
                    separators: ['.', '.'],
                }),
            ).toBe('14.30.45');
        });

        it('uses h separator', () => {
            expect(
                maskitoStringifyTime(14 * 60 * 60 * 1000 + 30 * 60 * 1000, {
                    mode: 'HH:MM',
                    separators: ['h'],
                }),
            ).toBe('14h30');
        });

        it('fr-CA style: " h " and " min " separators for HH:MM:SS', () => {
            expect(
                maskitoStringifyTime(14 * 60 * 60 * 1000 + 30 * 60 * 1000 + 45 * 1000, {
                    mode: 'HH:MM:SS',
                    separators: [' h ', ' min '],
                }),
            ).toBe('14 h 30 min 45');
        });

        it('fr-CA style with fractional seconds: " h ", " min ", "," for HH:MM:SS.MSS', () => {
            expect(
                maskitoStringifyTime(
                    18 * 60 * 60 * 1000 + 5 * 60 * 1000 + 5 * 1000 + 766,
                    {mode: 'HH:MM:SS.MSS', separators: [' h ', ' min ', ',']},
                ),
            ).toBe('18 h 05 min 05,766');
        });

        it('uses comma for milliseconds', () => {
            expect(
                maskitoStringifyTime(
                    14 * 60 * 60 * 1000 + 30 * 60 * 1000 + 45 * 1000 + 678,
                    {mode: 'HH:MM:SS.MSS', separators: [':', ':', ',']},
                ),
            ).toBe('14:30:45,678');
        });

        it('uses dot separator and comma for milliseconds together', () => {
            expect(
                maskitoStringifyTime(
                    14 * 60 * 60 * 1000 + 30 * 60 * 1000 + 45 * 1000 + 678,
                    {mode: 'HH:MM:SS.MSS', separators: ['.', '.', ',']},
                ),
            ).toBe('14.30.45,678');
        });

        it('short array repeats last separator for remaining positions', () => {
            expect(
                maskitoStringifyTime(14 * 60 * 60 * 1000 + 30 * 60 * 1000 + 45 * 1000, {
                    mode: 'HH:MM:SS',
                    separators: ['.'],
                }),
            ).toBe('14.30.45');
        });

        it('dot separator for MM:SS mode', () => {
            expect(
                maskitoStringifyTime(30 * 60 * 1000 + 45 * 1000, {
                    mode: 'MM:SS',
                    separators: ['.'],
                }),
            ).toBe('30.45');
        });

        it('comma separator for SS.MSS mode', () => {
            expect(
                maskitoStringifyTime(45 * 1000 + 678, {
                    mode: 'SS.MSS',
                    separators: [','],
                }),
            ).toBe('45,678');
        });

        it('dot and comma for MM:SS.MSS mode', () => {
            expect(
                maskitoStringifyTime(30 * 60 * 1000 + 45 * 1000 + 678, {
                    mode: 'MM:SS.MSS',
                    separators: ['.', ','],
                }),
            ).toBe('30.45,678');
        });

        it('is HH mode with no separators', () => {
            expect(maskitoStringifyTime(14 * 60 * 60 * 1000, {mode: 'HH'})).toBe('14');
        });

        it('empty string separator produces concatenated digits for HH:MM', () => {
            expect(
                maskitoStringifyTime(14 * 60 * 60 * 1000 + 30 * 60 * 1000, {
                    mode: 'HH:MM',
                    separators: [''],
                }),
            ).toBe('1430');
        });
    });
});
