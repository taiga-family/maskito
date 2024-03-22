import {MASKITO_DEFAULT_OPTIONS, maskitoTransform} from '@maskito/core';

import {MaskitoTimeMode} from '../../../types';
import {maskitoDateTimeOptionsGenerator} from '../date-time-mask';

describe('DateTime | dateTimeSeparator', () => {
    const dateTimeSeparators = [':', ';_', '_-_', '_at_'];
    let options = MASKITO_DEFAULT_OPTIONS;

    dateTimeSeparators.forEach(dateTimeSeparator => {
        const testCases: Array<{
            typedDigits: string;
            formattedDate: string;
            timeMode: MaskitoTimeMode;
        }> = [
            {
                typedDigits: '050220040341',
                formattedDate: `05.02.2004${dateTimeSeparator}03:41`,
                timeMode: 'HH:MM',
            },
            {
                typedDigits: '10062007034111',
                formattedDate: `10.06.2007${dateTimeSeparator}03:41:11`,
                timeMode: 'HH:MM:SS',
            },
            {
                typedDigits: '15081999034111111',
                formattedDate: `15.08.1999${dateTimeSeparator}03:41:11.111`,
                timeMode: 'HH:MM:SS.MSS',
            },
        ];

        describe(`correctly applies "${dateTimeSeparator}" as dateTimeSeparator`, () => {
            testCases.forEach(({typedDigits, formattedDate, timeMode}) => {
                beforeEach(() => {
                    options = maskitoDateTimeOptionsGenerator({
                        dateMode: 'dd/mm/yyyy',
                        timeMode,
                        dateTimeSeparator,
                    });
                });

                it(`${typedDigits} => ${formattedDate}`, () => {
                    expect(maskitoTransform(typedDigits, options)).toBe(formattedDate);
                });
            });
        });
    });
});
