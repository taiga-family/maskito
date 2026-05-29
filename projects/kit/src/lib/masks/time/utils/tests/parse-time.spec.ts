import {describe, expect, it} from '@jest/globals';
import {
    maskitoParseTime,
    type MaskitoTimeMode,
    type MaskitoTimeParams,
} from '@maskito/kit';

import {CHAR_NO_BREAK_SPACE} from '../../../../constants';

describe('maskitoParseTime', () => {
    const testCases = new Map<MaskitoTimeMode, Array<{text: string; ms: number}>>([
        [
            'HH:MM:SS.MSS',
            [
                {text: '', ms: 0},
                {text: '00:00:00.000', ms: 0},

                {
                    text: '1', // => 01:00:00.000
                    ms: 3600000,
                },
                {text: '10', ms: 36000000},
                {text: '12', ms: 43200000},
                {text: '12:', ms: 43200000},
                {
                    text: '12:3', // => 12:03:00.000
                    ms: 43380000,
                },
                {text: '12:30', ms: 45000000},
                {text: '12:34', ms: 45240000},
                {text: '12:34:', ms: 45240000},
                {
                    text: '12:34:5', // => 12:34:05.000
                    ms: 45245000,
                },
                {text: '12:34:50', ms: 45290000},
                {text: '12:34:56', ms: 45296000},
                {text: '12:34:56.', ms: 45296000},
                {
                    text: '12:34:56.7', // => 12:34:56.007
                    ms: 45296007,
                },
                {
                    text: '12:34:56.70', // => 12:34:56.070
                    ms: 45296070,
                },
                {text: '12:34:56.700', ms: 45296700},
                {
                    text: '12:34:56.78', // => 12:34:56.078
                    ms: 45296078,
                },
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

                {
                    text: '1', // => 01:00:00
                    ms: 3600000,
                },
                {text: '10', ms: 36000000},
                {text: '12', ms: 43200000},
                {text: '12:', ms: 43200000},
                {
                    text: '12:3', // => 12:03:00
                    ms: 43380000,
                },
                {text: '12:30', ms: 45000000},
                {text: '12:34', ms: 45240000},
                {text: '12:34:', ms: 45240000},
                {
                    text: '12:34:5', // => 12:34:05
                    ms: 45245000,
                },
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

                {
                    text: '1', // => 01:00
                    ms: 3600000,
                },
                {text: '10', ms: 36000000},
                {text: '12', ms: 43200000},
                {text: '12:', ms: 43200000},
                {
                    text: '12:3', // => 12:03
                    ms: 43380000,
                },
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

                {
                    text: '1', // => 01
                    ms: 3600000,
                },
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

                {
                    text: '1', // => 01:00.000
                    ms: 60000,
                },
                {text: '10', ms: 600000},
                {text: '12', ms: 720000},
                {text: '12:', ms: 720000},
                {
                    text: '12:3', // => 12:03.000
                    ms: 723000,
                },
                {text: '12:30', ms: 750000},
                {text: '12:34', ms: 754000},
                {text: '12:34.', ms: 754000},
                {
                    text: '12:34.5', // => 12:34.005
                    ms: 754005,
                },
                {
                    text: '12:34.50', // => 12:34.050
                    ms: 754050,
                },
                {text: '12:34.500', ms: 754500},
                {
                    text: '12:34.56', // => 12:34.056
                    ms: 754056,
                },
                {text: '12:34.560', ms: 754560},
                {text: '12:34.567', ms: 754567},

                {text: '59:59.999', ms: 3599999},
            ],
        ],
        [
            'MM:SS',
            [
                {text: '', ms: 0},
                {
                    text: '1', // => 01:00
                    ms: 60000,
                },
                {text: '10', ms: 600000},
                {text: '12', ms: 720000},
                {text: '12:', ms: 720000},
                {
                    text: '12:3', // => 12:03
                    ms: 723000,
                },
                {text: '12:30', ms: 750000},
            ],
        ],
        [
            'SS.MSS',
            [
                {text: '', ms: 0},
                {text: '00.000', ms: 0},

                {
                    text: '1', // => 01.000
                    ms: 1000,
                },
                {text: '10', ms: 10000},
                {text: '12', ms: 12000},
                {text: '12.', ms: 12000},
                {
                    text: '12.3', // => 12.003
                    ms: 12003,
                },
                {
                    text: '12.30', // => 12.030
                    ms: 12030,
                },
                {text: '12.300', ms: 12300},
                {
                    text: '12.34', // => 12.034
                    ms: 12034,
                },
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

    describe('with explicit `dayPeriod`', () => {
        const HOUR = 60 * 60 * 1000;
        const MINUTE = 60 * 1000;

        const dayPeriodCases: Array<{
            label: string;
            params: MaskitoTimeParams;
            text: string;
            ms: number;
        }> = [
            {
                label: "['AM', 'PM'] with HH:MM",
                params: {mode: 'HH:MM', dayPeriod: ['AM', 'PM']},
                text: `12:00${CHAR_NO_BREAK_SPACE}AM`,
                ms: 0,
            },
            {
                label: "['AM', 'PM'] with HH:MM (PM)",
                params: {mode: 'HH:MM', dayPeriod: ['AM', 'PM']},
                text: `01:00${CHAR_NO_BREAK_SPACE}PM`,
                ms: 13 * HOUR,
            },
            {
                label: "['am', 'pm'] lowercase (hi-IN) with HH:MM",
                params: {mode: 'HH:MM', dayPeriod: ['am', 'pm']},
                text: `11:59${CHAR_NO_BREAK_SPACE}pm`,
                ms: 23 * HOUR + 59 * MINUTE,
            },
            {
                label: "['ص', 'م'] Arabic with HH:MM (AM)",
                params: {mode: 'HH:MM', dayPeriod: ['ص', 'م']},
                text: `09:30${CHAR_NO_BREAK_SPACE}ص`,
                ms: 9 * HOUR + 30 * MINUTE,
            },
            {
                label: "['ص', 'م'] Arabic with HH:MM (PM)",
                params: {mode: 'HH:MM', dayPeriod: ['ص', 'م']},
                text: `09:30${CHAR_NO_BREAK_SPACE}م`,
                ms: 21 * HOUR + 30 * MINUTE,
            },
            {
                label: "['上午', '下午'] Chinese with HH:MM (PM)",
                params: {mode: 'HH:MM', dayPeriod: ['上午', '下午']},
                text: `03:00${CHAR_NO_BREAK_SPACE}下午`,
                ms: 15 * HOUR,
            },
        ];

        dayPeriodCases.forEach(({label, params, text, ms}) => {
            it(`${label}: '${text}' => ${ms}ms`, () => {
                expect(maskitoParseTime(text, params)).toBe(ms);
            });
        });
    });
});
