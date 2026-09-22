import {describe, expect, it} from '@jest/globals';

import {isDateTimeStringComplete} from '../is-date-time-string-complete';

describe('isDateTimeStringComplete', () => {
    const options = {
        dateMode: 'dd.mm.yyyy',
        timeMode: 'HH:MM',
        timeSeparators: [],
        dateTimeSeparator: ', ',
    } as const;

    it('complete value with canonical separators', () => {
        expect(isDateTimeStringComplete('10.05.2025, 18:30', options)).toBe(true);
    });

    it('incomplete value with canonical separators', () => {
        expect(isDateTimeStringComplete('10.05.2025, 18:3', options)).toBe(false);
    });

    it('complete value with multi-character time separator', () => {
        expect(
            isDateTimeStringComplete('10.05.2025, 18 h 30', {
                ...options,
                timeSeparators: [' h '],
            }),
        ).toBe(true);
    });

    it('incomplete value with multi-character time separator', () => {
        expect(
            isDateTimeStringComplete('10.05.2025, 18 h 3', {
                ...options,
                timeSeparators: [' h '],
            }),
        ).toBe(false);
    });

    it('complete value with empty time separator', () => {
        expect(
            isDateTimeStringComplete('10.05.2025, 1830', {
                ...options,
                timeSeparators: [''],
            }),
        ).toBe(true);
    });
});
