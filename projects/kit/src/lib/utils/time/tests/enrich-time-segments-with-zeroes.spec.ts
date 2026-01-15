import {describe, expect, it} from '@jest/globals';

import {enrichTimeSegmentsWithZeroes} from '../enrich-time-segments-with-zeroes';

describe('enrichTimeSegmentsWithZeroes', () => {
    const fn = (value: string): string =>
        enrichTimeSegmentsWithZeroes({value, selection: [0, 0]}, {mode: 'HH:MM:SS'})
            .value;

    it('all time segments valid', () => {
        expect(fn('17:43:00')).toBe('17:43:00');
    });

    it('contains invalid time segment for hours', () => {
        expect(fn('30:30:30')).toBe('03:30:30');
    });

    it('invalid time segment for minutes', () => {
        expect(fn('23:70:30')).toBe('23:07:30');
    });

    it('invalid time segment for seconds', () => {
        expect(fn('23:07:90')).toBe('23:07:09');
    });
});
