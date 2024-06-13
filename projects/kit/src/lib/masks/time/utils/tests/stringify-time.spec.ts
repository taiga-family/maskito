import {describe, expect, it} from '@jest/globals';
import type {MaskitoTimeMode} from '@maskito/kit';
import {maskitoStringifyTime} from '@maskito/kit';

describe('maskitoStringifyTime', () => {
    const testCases = new Map<MaskitoTimeMode, Array<{ms: number; text: string}>>([
        [
            'HH:MM:SS.MSS',
            [
                {ms: 0, text: '00:00:00.000'},
                {ms: 45296789, text: '12:34:56.789'},
                {ms: 86399999, text: '23:59:59.999'},
            ],
        ],
        [
            'HH:MM:SS',
            [
                {ms: 0, text: '00:00:00'},
                {ms: 45296000, text: '12:34:56'},
                {ms: 86399000, text: '23:59:59'},
            ],
        ],
        [
            'HH:MM',
            [
                {ms: 0, text: '00:00'},
                {ms: 45240000, text: '12:34'},
                {ms: 86340000, text: '23:59'},
            ],
        ],
        [
            'HH',
            [
                {ms: 0, text: '00'},
                {ms: 43200000, text: '12'},
                {ms: 82800000, text: '23'},
            ],
        ],
        [
            'MM.SS.MSS',
            [
                {ms: 0, text: '00.00.000'},
                {ms: 754560, text: '12.34.560'},
                {ms: 3599999, text: '59.59.999'},
            ],
        ],
        [
            'SS.MSS',
            [
                {ms: 0, text: '00.000'},
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
});
