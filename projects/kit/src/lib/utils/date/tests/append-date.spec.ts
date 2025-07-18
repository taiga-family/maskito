import {describe, expect, it} from '@jest/globals';

import {appendDate} from '../append-date';

const y2000m6d15 = new Date(2000, 6, 15);

describe('appendDate', () => {
    it('year: 2000, month: 6, day: 15, if {} was passed', () => {
        const result = appendDate(y2000m6d15, {});

        expect(result.getFullYear()).toBe(2000);
        expect(result.getMonth()).toBe(6);
        expect(result.getDate()).toBe(15);
    });

    it('year: 2000, month: 6, day: 15, if {year: 0} was passed', () => {
        const result = appendDate(y2000m6d15, {year: 0});

        expect(result.getFullYear()).toBe(2000);
        expect(result.getMonth()).toBe(6);
        expect(result.getDate()).toBe(15);
    });

    it('year: 2000, month: 6, day: 15, if {year: 0, month: 0} was passed', () => {
        const result = appendDate(y2000m6d15, {year: 0, month: 0});

        expect(result.getFullYear()).toBe(2000);
        expect(result.getMonth()).toBe(6);
        expect(result.getDate()).toBe(15);
    });

    it('year: 2000, month: 6, day: 15, if {year: 0, month: 0, day: 0} was passed', () => {
        const result = appendDate(y2000m6d15, {
            year: 0,
            month: 0,
            day: 0,
        });

        expect(result.getFullYear()).toBe(2000);
        expect(result.getMonth()).toBe(6);
        expect(result.getDate()).toBe(15);
    });

    it('year: 2005, month: 6, day: 14, if {year: 5} was passed', () => {
        const result = appendDate(y2000m6d15, {year: 5});

        expect(result.getFullYear()).toBe(2005);
        expect(result.getMonth()).toBe(6);
        expect(result.getDate()).toBe(14);
    });

    it('year: 1995, month: 6, day: 14, if {year: -5} was passed', () => {
        const result = appendDate(y2000m6d15, {year: -5});

        expect(result.getFullYear()).toBe(1995);
        expect(result.getMonth()).toBe(6);
        expect(result.getDate()).toBe(14);
    });

    it('year: 2000, month: 11, day: 14, if {month: 5} was passed', () => {
        const result = appendDate(y2000m6d15, {month: 5});

        expect(result.getFullYear()).toBe(2000);
        expect(result.getMonth()).toBe(11);
        expect(result.getDate()).toBe(14);
    });

    it('year: 2000, month: 1, day: 14, if {month: -5} was passed', () => {
        const result = appendDate(y2000m6d15, {month: -5});

        expect(result.getFullYear()).toBe(2000);
        expect(result.getMonth()).toBe(1);
        expect(result.getDate()).toBe(14);
    });

    it('year: 2000, month: 6, day: 19, if {day: 5} was passed', () => {
        const result = appendDate(y2000m6d15, {day: 5});

        expect(result.getFullYear()).toBe(2000);
        expect(result.getMonth()).toBe(6);
        expect(result.getDate()).toBe(19);
    });

    it('year: 2000, month: 6, day: 9, if {day: -5} was passed', () => {
        const result = appendDate(y2000m6d15, {day: -5});

        expect(result.getFullYear()).toBe(2000);
        expect(result.getMonth()).toBe(6);
        expect(result.getDate()).toBe(9);
    });

    it('year: 2000, month: 6, day: 31, if {day: 17} was passed', () => {
        const result = appendDate(y2000m6d15, {day: 17});

        expect(result.getFullYear()).toBe(2000);
        expect(result.getMonth()).toBe(6);
        expect(result.getDate()).toBe(31);
    });

    it('year: 2000, month: 11, day: 30, if {day: 169} was passed', () => {
        const result = appendDate(y2000m6d15, {day: 169});

        expect(result.getFullYear()).toBe(2000);
        expect(result.getMonth()).toBe(11);
        expect(result.getDate()).toBe(30);
    });

    it('year: 2000, month: 11, day: 31, if {day: 170} was passed', () => {
        const result = appendDate(y2000m6d15, {day: 170});

        expect(result.getFullYear()).toBe(2000);
        expect(result.getMonth()).toBe(11);
        expect(result.getDate()).toBe(31);
    });

    it('year: 1999, month: 11, day: 30, if {day: -197} was passed', () => {
        const result = appendDate(y2000m6d15, {day: -197});

        expect(result.getFullYear()).toBe(1999);
        expect(result.getMonth()).toBe(11);
        expect(result.getDate()).toBe(30);
    });

    it('year: 2000, month: 5, day: 29, if {day: -15} was passed', () => {
        const result = appendDate(y2000m6d15, {day: -15});

        expect(result.getFullYear()).toBe(2000);
        expect(result.getMonth()).toBe(5);
        expect(result.getDate()).toBe(29);
    });

    it('year: 2000, month: 2, day: 28, if {month: -4, day: 14} was passed', () => {
        const result = appendDate(y2000m6d15, {month: -4, day: 14});

        expect(result.getFullYear()).toBe(2000);
        expect(result.getMonth()).toBe(2);
        expect(result.getDate()).toBe(28);
    });

    it('year: 1999, month: 11, day: 30, if {month: -6, day: -15} was passed', () => {
        const result = appendDate(y2000m6d15, {month: -6, day: -15});

        expect(result.getFullYear()).toBe(1999);
        expect(result.getMonth()).toBe(11);
        expect(result.getDate()).toBe(30);
    });

    it('capped day when moving forward', () => {
        const result = appendDate(new Date(2018, 2, 30), {
            month: -1,
        });

        expect(result.getFullYear()).toBe(2018);
        expect(result.getMonth()).toBe(1);
        expect(result.getDate()).toBe(27);
    });

    it('capped day when moving backward', () => {
        const result = appendDate(new Date(2018, 0, 31), {month: 1});

        expect(result.getFullYear()).toBe(2018);
        expect(result.getMonth()).toBe(1);
        expect(result.getDate()).toBe(27);
    });

    it('year: 2025, month: 0, day: 31, if {month: 1} was passed', () => {
        const result = appendDate(new Date(2025, 0, 1), {month: 1});

        expect(result.getFullYear()).toBe(2025);
        expect(result.getMonth()).toBe(0);
        expect(result.getDate()).toBe(31);
    });

    it('year: 2025, month: 1, day: 27, if {month: 1} was passed', () => {
        const result = appendDate(new Date(2025, 0, 31), {month: 1});

        expect(result.getFullYear()).toBe(2025);
        expect(result.getMonth()).toBe(1);
        expect(result.getDate()).toBe(27);
    });
});
