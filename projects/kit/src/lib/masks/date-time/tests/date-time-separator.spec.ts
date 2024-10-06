import {beforeEach, describe, expect, it} from '@jest/globals';
import {MASKITO_DEFAULT_OPTIONS, maskitoTransform} from '@maskito/core';

import type {MaskitoTimeMode} from '../../../types';
import {maskitoDateTimeOptionsGenerator} from '../date-time-mask';

describe('DateTime | dateTimeSeparator', () => {
    const dateTimeSeparators = [':', ';_', '_-_', '_at_'];
    let options = MASKITO_DEFAULT_OPTIONS;

    dateTimeSeparators.forEach((dateTimeSeparator) => {
        const testCases: ReadonlyArray<{
            typedDigits: string;
            formattedValue: string;
            timeMode: MaskitoTimeMode;
        }> = [
            {
                typedDigits: '050220040341',
                formattedValue: `05.02.2004${dateTimeSeparator}03:41`,
                timeMode: 'HH:MM',
            },
            {
                typedDigits: '10062007034111',
                formattedValue: `10.06.2007${dateTimeSeparator}03:41:11`,
                timeMode: 'HH:MM:SS',
            },
            {
                typedDigits: '15081999034111111',
                formattedValue: `15.08.1999${dateTimeSeparator}03:41:11.111`,
                timeMode: 'HH:MM:SS.MSS',
            },
        ];

        describe(`correctly applies "${dateTimeSeparator}" as dateTimeSeparator`, () => {
            testCases.forEach(({typedDigits, formattedValue, timeMode}) => {
                beforeEach(() => {
                    options = maskitoDateTimeOptionsGenerator({
                        dateMode: 'dd/mm/yyyy',
                        timeMode,
                        dateTimeSeparator,
                    });
                });

                it(`${typedDigits} => ${formattedValue}`, () => {
                    expect(maskitoTransform(typedDigits, options)).toBe(formattedValue);
                });
            });
        });
    });
});
