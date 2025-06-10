import {describe, expect, it} from '@jest/globals';
import type {MaskitoTimeMode} from '@maskito/kit';
import {maskitoParseTime} from '@maskito/kit';

describe('maskitoParseTime', () => {
    const testCases = new Map<MaskitoTimeMode, Array<{text: string; ms: number}>>([
        [
            'HH:MM:SS.MSS',
            [
                {text: '', ms: 0},
                {text: '00:00:00.000', ms: 0},

                {text: '1', ms: 36000000},
                {text: '10', ms: 36000000},
                {text: '12', ms: 43200000},
                {text: '12:', ms: 43200000},
                {text: '12:3', ms: 45000000},
                {text: '12:30', ms: 45000000},
                {text: '12:34', ms: 45240000},
                {text: '12:34:', ms: 45240000},
                {text: '12:34:5', ms: 45290000},
                {text: '12:34:50', ms: 45290000},
                {text: '12:34:56', ms: 45296000},
                {text: '12:34:56.', ms: 45296000},
                {text: '12:34:56.7', ms: 45296700},
                {text: '12:34:56.70', ms: 45296700},
                {text: '12:34:56.700', ms: 45296700},
                {text: '12:34:56.78', ms: 45296780},
                {text: '12:34:56.780', ms: 45296780},
                {text: '12:34:56.789', ms: 45296789},

                {text: '23:59:59.999', ms: 86399999},
            ],
        ],
        [
            'HH:MM:SS.MSS AA',
            [
                {text: '', ms: 0},
                {text: '12:00:00.000 AM', ms: 0},
                {text: '01:00:00.000 AM', ms: 3600000},
                {text: '11:59:59.999 AM', ms: 43199999},
                {text: '12:00:00.000 PM', ms: 43200000},
                {text: '01:00:00.000 PM', ms: 46800000},
                {text: '11:59:59.999 PM', ms: 86399999},
            ],
        ],
        [
            'HH:MM:SS',
            [
                {text: '', ms: 0},
                {text: '00:00:00', ms: 0},

                {text: '1', ms: 36000000},
                {text: '10', ms: 36000000},
                {text: '12', ms: 43200000},
                {text: '12:', ms: 43200000},
                {text: '12:3', ms: 45000000},
                {text: '12:30', ms: 45000000},
                {text: '12:34', ms: 45240000},
                {text: '12:34:', ms: 45240000},
                {text: '12:34:5', ms: 45290000},
                {text: '12:34:50', ms: 45290000},
                {text: '12:34:56', ms: 45296000},

                {text: '23:59:59', ms: 86399000},
            ],
        ],
        [
            'HH:MM:SS AA',
            [
                {text: '', ms: 0},
                {text: '12:00:00 AM', ms: 0},
                {text: '01:00:00 AM', ms: 3600000},
                {text: '11:59:59 AM', ms: 43199000},
                {text: '12:00:00 PM', ms: 43200000},
                {text: '01:00:00 PM', ms: 46800000},
                {text: '11:59:59 PM', ms: 86399000},
            ],
        ],
        [
            'HH:MM',
            [
                {text: '', ms: 0},
                {text: '00:00', ms: 0},

                {text: '1', ms: 36000000},
                {text: '10', ms: 36000000},
                {text: '12', ms: 43200000},
                {text: '12:', ms: 43200000},
                {text: '12:3', ms: 45000000},
                {text: '12:30', ms: 45000000},
                {text: '12:34', ms: 45240000},

                {text: '23:59', ms: 86340000},
            ],
        ],
        [
            'HH:MM AA',
            [
                {text: '', ms: 0},
                {text: '12:00 AM', ms: 0},
                {text: '01:00 AM', ms: 3600000},
                {text: '11:59 AM', ms: 43140000},
                {text: '12:00 PM', ms: 43200000},
                {text: '01:00 PM', ms: 46800000},
                {text: '11:59 PM', ms: 86340000},
            ],
        ],
        [
            'HH',
            [
                {text: '', ms: 0},
                {text: '00', ms: 0},

                {text: '1', ms: 36000000},
                {text: '10', ms: 36000000},
                {text: '12', ms: 43200000},

                {text: '23', ms: 82800000},
            ],
        ],
        [
            'HH AA',
            [
                {text: '', ms: 0},
                {text: '12 AM', ms: 0},
                {text: '01 AM', ms: 3600000},
                {text: '11 AM', ms: 39600000},
                {text: '12 PM', ms: 43200000},
                {text: '01 PM', ms: 46800000},
                {text: '11 PM', ms: 82800000},
            ],
        ],
        [
            'MM:SS.MSS',
            [
                {text: '', ms: 0},
                {text: '00:00.000', ms: 0},

                {text: '1', ms: 600000},
                {text: '10', ms: 600000},
                {text: '12', ms: 720000},
                {text: '12.', ms: 720000},
                {text: '12:3', ms: 750000},
                {text: '12:30', ms: 750000},
                {text: '12:34', ms: 754000},
                {text: '12:34.', ms: 754000},
                {text: '12:34.5', ms: 754500},
                {text: '12:34.50', ms: 754500},
                {text: '12:34.500', ms: 754500},
                {text: '12:34.56', ms: 754560},
                {text: '12:34.560', ms: 754560},
                {text: '12:34.567', ms: 754567},

                {text: '59:59.999', ms: 3599999},
            ],
        ],
        [
            'MM:SS',
            [
                {text: '', ms: 0},
                {text: '1', ms: 600000},
                {text: '10', ms: 600000},
                {text: '12', ms: 720000},
                {text: '12:', ms: 720000},
                {text: '12:3', ms: 750000},
                {text: '12:30', ms: 750000},
            ],
        ],
        [
            'SS.MSS',
            [
                {text: '', ms: 0},
                {text: '00.000', ms: 0},

                {text: '1', ms: 10000},
                {text: '10', ms: 10000},
                {text: '12', ms: 12000},
                {text: '12.', ms: 12000},
                {text: '12.3', ms: 12300},
                {text: '12.30', ms: 12300},
                {text: '12.300', ms: 12300},
                {text: '12.34', ms: 12340},
                {text: '12.340', ms: 12340},
                {text: '12.345', ms: 12345},

                {text: '59.999', ms: 59999},
            ],
        ],
    ]);

    testCases.forEach((cases, mode) => {
        describe(`mode ${mode}`, () => {
            cases.forEach(({text, ms}) => {
                it(`'${text}' => ${ms}ms`, () => {
                    expect(maskitoParseTime(text, {mode})).toBe(ms);
                });
            });
        });
    });
});
