import {describe, expect, it} from '@jest/globals';

import {toDateString} from '../to-date-string';

describe('toDateString', () => {
    const segments = {
        day: '10',
        month: '05',
        year: '2025',
        hours: '18',
        minutes: '30',
        seconds: '05',
    };

    it('uses canonical time separators by default', () => {
        expect(
            toDateString(segments, {
                dateMode: 'dd.mm.yyyy',
                dateTimeSeparator: ', ',
                timeMode: 'HH:MM:SS',
            }),
        ).toBe('10.05.2025, 18:30:05');
    });

    it('uses custom time separators', () => {
        expect(
            toDateString(segments, {
                dateMode: 'dd.mm.yyyy',
                dateTimeSeparator: ', ',
                timeMode: 'HH:MM:SS',
                timeSeparators: [' h ', ' min '],
            }),
        ).toBe('10.05.2025, 18 h 30 min 05');
    });

    it('does not confuse letters of time separators with date segments', () => {
        expect(
            toDateString(
                {...segments, seconds: ''},
                {
                    dateMode: 'dd.mm.yyyy',
                    dateTimeSeparator: ' ',
                    timeMode: 'HH:MM:SS',
                    timeSeparators: ['h', 'm'],
                },
            ),
        ).toBe('10.05.2025 18h30');
    });

    it('trims trailing separators of incomplete value', () => {
        expect(
            toDateString(
                {day: '10', month: '05', year: '2025'},
                {
                    dateMode: 'dd.mm.yyyy',
                    dateTimeSeparator: ', ',
                    timeMode: 'HH:MM',
                    timeSeparators: [' h '],
                },
            ),
        ).toBe('10.05.2025');
    });
});
