import {MASKITO_DEFAULT_OPTIONS, maskitoTransform} from '../../../../../../core/src';
import {MaskitoTimeMode} from '../../../types';
import {maskitoDateTimeOptionsGenerator} from '../date-time-mask';

describe('DateTime | dateTimeSeparator', () => {
    const dateTimeSeparators = [':', ';_', '_-_', '_at_'];
    let options = MASKITO_DEFAULT_OPTIONS;

    dateTimeSeparators.forEach(dateTimeSeparator => {
        const dates: Array<{
            type: string;
            result: string;
            date: string;
            timeMode: MaskitoTimeMode;
        }> = [
            {
                type: '050220040341',
                result: `05.02.2004${dateTimeSeparator}03:41`,
                date: '05.02.2004',
                timeMode: 'HH:MM',
            },
            {
                type: '05022004034111',
                result: `05.02.2004${dateTimeSeparator}03:41:11`,
                date: '05.02.2004',
                timeMode: 'HH:MM:SS',
            },
            {
                type: '05022004034111111',
                result: `05.02.2004${dateTimeSeparator}03:41:11.111`,
                date: '05.02.2004',
                timeMode: 'HH:MM:SS.MSS',
            },
        ];

        describe(`correctly applies "${dateTimeSeparator}" as dateTimeSeparator`, () => {
            dates.forEach(date => {
                beforeEach(() => {
                    options = maskitoDateTimeOptionsGenerator({
                        dateMode: 'dd/mm/yyyy',
                        timeMode: date.timeMode,
                        dateTimeSeparator,
                    });
                });

                it(`${date.type} => ${date.result}`, () => {
                    expect(maskitoTransform(date.type, options)).toBe(date.result);
                });
            });
        });
    });
});
