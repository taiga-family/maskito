import {describe, expect, it} from '@jest/globals';

import {toTimeString} from '../to-time-string';

describe('toTimeString', () => {
    describe('HH', () => {
        it('21', () => {
            expect(toTimeString({hours: '21'})).toBe('21');
        });

        it('1', () => {
            expect(toTimeString({hours: '1'})).toBe('1');
        });
    });

    describe('HH:MM', () => {
        it('21:59', () => {
            expect(toTimeString({hours: '21', minutes: '59'})).toBe('21:59');
        });

        it('12:4', () => {
            expect(toTimeString({hours: '12', minutes: '4'})).toBe('12:4');
        });
    });

    describe('HH:MM:SS', () => {
        it('21:59:23', () => {
            expect(toTimeString({hours: '21', minutes: '59', seconds: '23'})).toBe(
                '21:59:23',
            );
        });

        it('01:23:5', () => {
            expect(toTimeString({hours: '01', minutes: '23', seconds: '5'})).toBe(
                '01:23:5',
            );
        });
    });

    describe('HH:MM:SS.MSS', () => {
        it('21:59:23.111', () => {
            expect(
                toTimeString({
                    hours: '21',
                    minutes: '59',
                    seconds: '23',
                    milliseconds: '111',
                }),
            ).toBe('21:59:23.111');
        });

        it('01:23:52.1', () => {
            expect(
                toTimeString({
                    hours: '01',
                    minutes: '23',
                    seconds: '52',
                    milliseconds: '1',
                }),
            ).toBe('01:23:52.1');
        });

        it('13:13:13.15', () => {
            expect(
                toTimeString({
                    hours: '13',
                    minutes: '13',
                    seconds: '13',
                    milliseconds: '15',
                }),
            ).toBe('13:13:13.15');
        });
    });

    describe('MM:SS.MSS', () => {
        it('12:12.111', () => {
            expect(
                toTimeString({
                    minutes: '12',
                    seconds: '12',
                    milliseconds: '111',
                }),
            ).toBe('12:12.111');
        });

        it('23:01.9', () => {
            expect(
                toTimeString({
                    minutes: '23',
                    seconds: '01',
                    milliseconds: '9',
                }),
            ).toBe('23:01.9');
        });

        it('00:02.91', () => {
            expect(
                toTimeString({
                    minutes: '00',
                    seconds: '02',
                    milliseconds: '91',
                }),
            ).toBe('00:02.91');
        });
    });

    describe('SS.MSS', () => {
        it('12.111', () => {
            expect(
                toTimeString({
                    seconds: '12',
                    milliseconds: '111',
                }),
            ).toBe('12.111');
        });

        it('01.9', () => {
            expect(
                toTimeString({
                    seconds: '01',
                    milliseconds: '9',
                }),
            ).toBe('01.9');
        });

        it('02.91', () => {
            expect(
                toTimeString({
                    seconds: '02',
                    milliseconds: '91',
                }),
            ).toBe('02.91');
        });
    });
});
