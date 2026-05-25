import {describe, expect, it} from '@jest/globals';
import {maskitoStringifyTime, type MaskitoTimeMode} from '@maskito/kit';

import {CHAR_NO_BREAK_SPACE} from '../../../../constants';

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;

describe('maskitoStringifyTime', () => {
    const testCases = new Map<MaskitoTimeMode, Array<{ms: number; text: string}>>([
        [
            'HH:MM:SS.MSS',
            [
                {ms: 0, text: '00:00:00.000'},
                {ms: HOUR + MINUTE + 1000 + 1, text: '01:01:01.001'},
                {ms: 12 * HOUR + 34 * MINUTE + 56 * 1000 + 789, text: '12:34:56.789'},
                {ms: 23 * HOUR + 59 * MINUTE + 59 * 1000 + 999, text: '23:59:59.999'},
            ],
        ],
        [
            'HH:MM:SS.MSS AA',
            [
                {ms: 0, text: `12:00:00.000${CHAR_NO_BREAK_SPACE}AM`},
                {ms: HOUR, text: `01:00:00.000${CHAR_NO_BREAK_SPACE}AM`},
                {
                    ms: 11 * HOUR + 59 * MINUTE + 59 * 1000 + 999,
                    text: `11:59:59.999${CHAR_NO_BREAK_SPACE}AM`,
                },
                {ms: 12 * HOUR, text: `12:00:00.000${CHAR_NO_BREAK_SPACE}PM`},
                {ms: 13 * HOUR, text: `01:00:00.000${CHAR_NO_BREAK_SPACE}PM`},
                {
                    ms: 23 * HOUR + 59 * MINUTE + 59 * 1000 + 999,
                    text: `11:59:59.999${CHAR_NO_BREAK_SPACE}PM`,
                },
            ],
        ],
        [
            'HH:MM:SS',
            [
                {ms: 0, text: '00:00:00'},
                {ms: HOUR + MINUTE + 1000, text: '01:01:01'},
                {ms: 3 * HOUR + 2 * MINUTE, text: '03:02:00'},
                {ms: 12 * HOUR + 34 * MINUTE + 56 * 1000, text: '12:34:56'},
                {ms: 23 * HOUR + 59 * MINUTE + 59 * 1000, text: '23:59:59'},
            ],
        ],
        [
            'HH:MM:SS AA',
            [
                {ms: 0, text: `12:00:00${CHAR_NO_BREAK_SPACE}AM`},
                {ms: HOUR, text: `01:00:00${CHAR_NO_BREAK_SPACE}AM`},
                {
                    ms: 11 * HOUR + 59 * MINUTE + 59 * 1000,
                    text: `11:59:59${CHAR_NO_BREAK_SPACE}AM`,
                },
                {ms: 12 * HOUR, text: `12:00:00${CHAR_NO_BREAK_SPACE}PM`},
                {ms: 13 * HOUR, text: `01:00:00${CHAR_NO_BREAK_SPACE}PM`},
                {
                    ms: 23 * HOUR + 59 * MINUTE + 59 * 1000,
                    text: `11:59:59${CHAR_NO_BREAK_SPACE}PM`,
                },
            ],
        ],
        [
            'HH:MM',
            [
                {ms: 0, text: '00:00'},
                {ms: HOUR + MINUTE, text: '01:01'},
                {ms: 12 * HOUR + 34 * MINUTE, text: '12:34'},
                {ms: 23 * HOUR + 59 * MINUTE, text: '23:59'},
            ],
        ],
        [
            'HH:MM AA',
            [
                {ms: 0, text: `12:00${CHAR_NO_BREAK_SPACE}AM`},
                {ms: HOUR, text: `01:00${CHAR_NO_BREAK_SPACE}AM`},
                {ms: 11 * HOUR + 59 * MINUTE, text: `11:59${CHAR_NO_BREAK_SPACE}AM`},
                {ms: 12 * HOUR, text: `12:00${CHAR_NO_BREAK_SPACE}PM`},
                {ms: 13 * HOUR, text: `01:00${CHAR_NO_BREAK_SPACE}PM`},
                {ms: 23 * HOUR + 59 * MINUTE, text: `11:59${CHAR_NO_BREAK_SPACE}PM`},
            ],
        ],
        [
            'HH',
            [
                {ms: 0, text: '00'},
                {ms: HOUR, text: '01'},
                {ms: 12 * HOUR, text: '12'},
                {ms: 23 * HOUR, text: '23'},
            ],
        ],
        [
            'HH AA',
            [
                {ms: 0, text: `12${CHAR_NO_BREAK_SPACE}AM`},
                {ms: HOUR, text: `01${CHAR_NO_BREAK_SPACE}AM`},
                {ms: 11 * HOUR, text: `11${CHAR_NO_BREAK_SPACE}AM`},
                {ms: 12 * HOUR, text: `12${CHAR_NO_BREAK_SPACE}PM`},
                {ms: 13 * HOUR, text: `01${CHAR_NO_BREAK_SPACE}PM`},
                {ms: 23 * HOUR, text: `11${CHAR_NO_BREAK_SPACE}PM`},
            ],
        ],
        [
            'MM:SS.MSS',
            [
                {ms: 0, text: '00:00.000'},
                {ms: MINUTE + 1000 + 1, text: '01:01.001'},
                {ms: 12 * MINUTE + 34 * 1000 + 567, text: '12:34.567'},
                {ms: 59 * MINUTE + 59 * 1000 + 999, text: '59:59.999'},
            ],
        ],
        [
            'MM:SS',
            [
                {ms: 0, text: '00:00'},
                {ms: MINUTE, text: '01:00'},
                {ms: 10 * MINUTE, text: '10:00'},
                {ms: 12 * MINUTE + 30 * 1000, text: '12:30'},
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
                maskitoStringifyTime(14 * HOUR + 30 * MINUTE, {
                    mode: 'HH:MM',
                    separators: ['.'],
                }),
            ).toBe('14.30');
        });

        it('preserves colon separator by default', () => {
            expect(maskitoStringifyTime(14 * HOUR + 30 * MINUTE, {mode: 'HH:MM'})).toBe(
                '14:30',
            );
        });

        it('uses dot separator with HH:MM:SS mode (both positions)', () => {
            expect(
                maskitoStringifyTime(14 * HOUR + 30 * MINUTE + 45 * 1000, {
                    mode: 'HH:MM:SS',
                    separators: ['.', '.'],
                }),
            ).toBe('14.30.45');
        });

        it('uses h separator', () => {
            expect(
                maskitoStringifyTime(14 * HOUR + 30 * MINUTE, {
                    mode: 'HH:MM',
                    separators: ['h'],
                }),
            ).toBe('14h30');
        });

        it('fr-CA style: " h " and " min " separators for HH:MM:SS', () => {
            expect(
                maskitoStringifyTime(14 * HOUR + 30 * MINUTE + 45 * 1000, {
                    mode: 'HH:MM:SS',
                    separators: [' h ', ' min '],
                }),
            ).toBe('14 h 30 min 45');
        });

        it('fr-CA style with fractional seconds: " h ", " min ", "," for HH:MM:SS.MSS', () => {
            expect(
                maskitoStringifyTime(18 * HOUR + 5 * MINUTE + 5 * 1000 + 766, {
                    mode: 'HH:MM:SS.MSS',
                    separators: [' h ', ' min ', ','],
                }),
            ).toBe('18 h 05 min 05,766');
        });

        it('uses comma for milliseconds', () => {
            expect(
                maskitoStringifyTime(14 * HOUR + 30 * MINUTE + 45 * 1000 + 678, {
                    mode: 'HH:MM:SS.MSS',
                    separators: [':', ':', ','],
                }),
            ).toBe('14:30:45,678');
        });

        it('uses dot separator and comma for milliseconds together', () => {
            expect(
                maskitoStringifyTime(14 * HOUR + 30 * MINUTE + 45 * 1000 + 678, {
                    mode: 'HH:MM:SS.MSS',
                    separators: ['.', '.', ','],
                }),
            ).toBe('14.30.45,678');
        });

        it('short array falls back to canonical separators from mode for remaining positions', () => {
            expect(
                maskitoStringifyTime(14 * HOUR + 30 * MINUTE + 45 * 1000, {
                    mode: 'HH:MM:SS',
                    separators: ['.'],
                }),
            ).toBe('14.30:45');
        });

        it('short array falls back to canonical separators from mode for HH:MM:SS.MSS', () => {
            expect(
                maskitoStringifyTime(14 * HOUR + 30 * MINUTE + 45 * 1000 + 678, {
                    mode: 'HH:MM:SS.MSS',
                    separators: ['.'],
                }),
            ).toBe('14.30:45.678');
        });

        it('dot separator for MM:SS mode', () => {
            expect(
                maskitoStringifyTime(30 * MINUTE + 45 * 1000, {
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
                maskitoStringifyTime(30 * MINUTE + 45 * 1000 + 678, {
                    mode: 'MM:SS.MSS',
                    separators: ['.', ','],
                }),
            ).toBe('30.45,678');
        });

        it('is HH mode with no separators', () => {
            expect(maskitoStringifyTime(14 * HOUR, {mode: 'HH'})).toBe('14');
        });

        it('empty string separator produces concatenated digits for HH:MM', () => {
            expect(
                maskitoStringifyTime(14 * HOUR + 30 * MINUTE, {
                    mode: 'HH:MM',
                    separators: [''],
                }),
            ).toBe('1430');
        });
    });
});
