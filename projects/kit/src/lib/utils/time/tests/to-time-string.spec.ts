import {describe, expect, it} from '@jest/globals';

import {toTimeString} from '../to-time-string';

describe('toTimeString', () => {
    describe('default separators from mode', () => {
        it('is HH:MM with both segments', () => {
            expect(
                toTimeString(
                    {hours: '14', minutes: '30'},
                    {mode: 'HH:MM', separators: []},
                ),
            ).toBe('14:30');
        });

        it('is HH:MM:SS with all segments', () => {
            expect(
                toTimeString(
                    {hours: '14', minutes: '30', seconds: '45'},
                    {mode: 'HH:MM:SS', separators: []},
                ),
            ).toBe('14:30:45');
        });

        it('is HH:MM:SS.MSS with all segments', () => {
            expect(
                toTimeString(
                    {hours: '14', minutes: '30', seconds: '45', milliseconds: '678'},
                    {mode: 'HH:MM:SS.MSS', separators: []},
                ),
            ).toBe('14:30:45.678');
        });

        it('is MM:SS mode (no hours)', () => {
            expect(
                toTimeString(
                    {minutes: '30', seconds: '45'},
                    {mode: 'MM:SS', separators: []},
                ),
            ).toBe('30:45');
        });

        it('is SS.MSS mode', () => {
            expect(
                toTimeString(
                    {seconds: '45', milliseconds: '678'},
                    {mode: 'SS.MSS', separators: []},
                ),
            ).toBe('45.678');
        });

        it('is HH AA mode strips AA from output', () => {
            expect(toTimeString({hours: '02'}, {mode: 'HH AA', separators: []})).toBe(
                '02',
            );
        });

        it('is HH:MM AA mode strips AA from output', () => {
            expect(
                toTimeString(
                    {hours: '02', minutes: '30'},
                    {mode: 'HH:MM AA', separators: []},
                ),
            ).toBe('02:30');
        });
    });

    describe('custom separators', () => {
        it('dot separator for HH:MM', () => {
            expect(
                toTimeString(
                    {hours: '14', minutes: '30'},
                    {mode: 'HH:MM', separators: ['.']},
                ),
            ).toBe('14.30');
        });

        it('h separator for HH:MM', () => {
            expect(
                toTimeString(
                    {hours: '14', minutes: '30'},
                    {mode: 'HH:MM', separators: ['h']},
                ),
            ).toBe('14h30');
        });

        it('fr-CA style " h " and " min " for HH:MM:SS', () => {
            expect(
                toTimeString(
                    {hours: '18', minutes: '05', seconds: '05'},
                    {mode: 'HH:MM:SS', separators: [' h ', ' min ']},
                ),
            ).toBe('18 h 05 min 05');
        });

        it('fr-CA style with comma for milliseconds in HH:MM:SS.MSS', () => {
            expect(
                toTimeString(
                    {hours: '18', minutes: '05', seconds: '05', milliseconds: '766'},
                    {mode: 'HH:MM:SS.MSS', separators: [' h ', ' min ', ',']},
                ),
            ).toBe('18 h 05 min 05,766');
        });

        it('single separator repeats for all positions', () => {
            expect(
                toTimeString(
                    {hours: '14', minutes: '30', seconds: '45'},
                    {mode: 'HH:MM:SS', separators: ['.']},
                ),
            ).toBe('14.30.45');
        });
    });

    describe('partial segments (leading/trailing separator trimming)', () => {
        it('trims trailing separator when seconds are absent', () => {
            expect(
                toTimeString(
                    {hours: '14', minutes: '30'},
                    {mode: 'HH:MM:SS', separators: []},
                ),
            ).toBe('14:30');
        });

        it('trims leading separator when hours are absent in MM:SS mode', () => {
            expect(toTimeString({minutes: '05'}, {mode: 'MM:SS', separators: []})).toBe(
                '05',
            );
        });

        it('trims fr-CA separator when minutes segment is absent', () => {
            expect(
                toTimeString(
                    {hours: '14'},
                    {mode: 'HH:MM:SS', separators: [' h ', ' min ']},
                ),
            ).toBe('14');
        });
    });
});
