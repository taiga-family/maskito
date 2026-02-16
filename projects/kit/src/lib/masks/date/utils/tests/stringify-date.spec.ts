import type {MaskitoDateMode} from '../../../../types';
import type {MaskitoDateParams} from '../../date-params';
import {maskitoStringifyDate} from '../stringify-date';

describe('maskitoStringifyDate', () => {
    const testCases = new Map<
        MaskitoDateMode,
        Array<Partial<MaskitoDateParams> & {date: Date; text: string}>
    >([
        [
            'dd/mm',
            [
                {date: new Date('2004-02-01'), text: '01.02'},
                {date: new Date('2012-12-30'), separator: '-', text: '30-12'},
                {
                    date: new Date('2012-12-30'),
                    max: new Date('2012-12-29'),
                    text: '29.12',
                },
                {
                    date: new Date('2012-12-12'),
                    min: new Date('2012-12-13'),
                    text: '13.12',
                },
            ],
        ],
        [
            'dd/mm/yyyy',
            [
                {date: new Date('2012-03-25'), text: '25.03.2012'},
                {
                    date: new Date('2024-03-25'),
                    max: new Date('2024-01-31'),
                    separator: '/',
                    text: '31/01/2024',
                },
                {
                    date: new Date('2024-01-31'),
                    min: new Date('2024-03-25'),
                    separator: ':',
                    text: '25:03:2024',
                },
            ],
        ],
        [
            'mm/dd',
            [
                {date: new Date('2004-02-01'), text: '02.01'},
                {date: new Date('2012-12-30'), separator: '-', text: '12-30'},
                {
                    date: new Date('2012-12-30'),
                    max: new Date('2012-12-29'),
                    text: '12.29',
                },
                {
                    date: new Date('2012-12-12'),
                    min: new Date('2012-12-13'),
                    text: '12.13',
                },
            ],
        ],
        [
            'mm/dd/yyyy',
            [
                {date: new Date('2000-10-01'), text: '10.01.2000'},
                {
                    date: new Date('2024-03-25'),
                    max: new Date('2024-01-31'),
                    separator: '/',
                    text: '01/31/2024',
                },
                {
                    date: new Date('2024-01-31'),
                    min: new Date('2024-03-25'),
                    separator: '-',
                    text: '03-25-2024',
                },
            ],
        ],
        [
            'mm/yy',
            [
                {date: new Date('2000-10-01'), text: '10.00'},
                {
                    date: new Date('2012-10-20'),
                    max: new Date('2012-10-19'),
                    separator: '/',
                    text: '10/12',
                },
                {
                    date: new Date('2024-01-31'),
                    min: new Date('2024-03-25'),
                    text: '03.24',
                },
            ],
        ],
        [
            'mm/yyyy',
            [
                {date: new Date('2000-10-01'), text: '10.2000'},
                {
                    date: new Date('2012-10-20'),
                    max: new Date('2012-10-19'),
                    separator: '/',
                    text: '10/2012',
                },
                {
                    date: new Date('2024-01-31'),
                    min: new Date('2024-03-25'),
                    text: '03.2024',
                },
            ],
        ],
        [
            'yyyy',
            [
                {date: new Date('2000-10-01'), text: '2000'},
                {
                    date: new Date('2012-10-20'),
                    max: new Date('2011-10-19'),
                    text: '2011',
                },
                {
                    date: new Date('2024-01-31'),
                    min: new Date('2050-03-25'),
                    text: '2050',
                },
            ],
        ],
        [
            'yyyy/mm',
            [
                {date: new Date('2000-10-01'), text: '2000.10'},
                {
                    date: new Date('2012-10-20'),
                    max: new Date('2012-09-19'),
                    separator: '-',
                    text: '2012-09',
                },
                {
                    date: new Date('2024-01-31'),
                    min: new Date('2024-03-25'),
                    text: '2024.03',
                },
            ],
        ],
        [
            'yyyy/mm/dd',
            [
                {date: new Date('2000-10-01'), text: '2000.10.01'},
                {
                    date: new Date('2024-03-25'),
                    max: new Date('2024-01-31'),
                    separator: '/',
                    text: '2024/01/31',
                },
                {
                    date: new Date('2024-01-31'),
                    min: new Date('2024-03-25'),
                    text: '2024.03.25',
                },
            ],
        ],
    ]);

    testCases.forEach((cases, mode) => {
        describe(`mode ${mode}`, () => {
            cases.forEach(({date, separator, text, min, max}) => {
                it(`${date.toString()} => '${text}'`, () => {
                    expect(maskitoStringifyDate(date, {mode, separator, min, max})).toBe(
                        text,
                    );
                });
            });
        });
    });

    describe('year contains leading zeroes', () => {
        const date = new Date('0042-02-13T00:00:00.000');

        it('dd/mm/yyyy', () => {
            expect(maskitoStringifyDate(date, {mode: 'dd/mm/yyyy'})).toBe('13.02.0042');
        });

        it('yyyy/mm/dd', () => {
            expect(maskitoStringifyDate(date, {mode: 'yyyy/mm/dd'})).toBe('0042.02.13');
        });

        it('mm/yy', () => {
            expect(maskitoStringifyDate(date, {mode: 'mm/yy'})).toBe('02.42');
        });
    });
});
