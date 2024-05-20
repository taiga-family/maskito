import {describe, expect, it} from '@jest/globals';

import {parseTimeString} from '../parse-time-string';

describe('parseTimeString', () => {
    it('HH', () => {
        expect(parseTimeString('19', 'HH')).toEqual({
            hours: '19',
        });
    });

    it('HH:MM', () => {
        expect(parseTimeString('23:59', 'HH:MM')).toEqual({
            hours: '23',
            minutes: '59',
        });
    });

    it('HH:MM:SS', () => {
        expect(parseTimeString('12:24:55', 'HH:MM:SS')).toEqual({
            hours: '12',
            minutes: '24',
            seconds: '55',
        });
    });

    it('HH:MM:SS.MSS', () => {
        expect(parseTimeString('10:05:42.783', 'HH:MM:SS.MSS')).toEqual({
            hours: '10',
            minutes: '05',
            seconds: '42',
            milliseconds: '783',
        });
    });

    it('MM.SS.MSS', () => {
        expect(parseTimeString('12.30.001', 'MM.SS.MSS')).toEqual({
            minutes: '12',
            seconds: '30',
            milliseconds: '001',
        });
    });

    it('SS.MSS', () => {
        expect(parseTimeString('59.999', 'SS.MSS')).toEqual({
            seconds: '59',
            milliseconds: '999',
        });
    });
});
