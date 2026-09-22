import {describe, expect, it} from '@jest/globals';
import {maskitoTransform} from '@maskito/core';

import {maskitoDateTime} from '../date-time-mask';
import {maskitoParseDateTime, maskitoStringifyDateTime} from '../utils';

describe('DateTime | timeSeparators', () => {
    describe('applies custom separators between time segments', () => {
        const testCases = [
            {
                timeMode: 'HH:MM',
                timeSeparators: ['.'],
                typedDigits: '050220040341',
                formattedValue: '05.02.2004, 03.41',
            },
            {
                timeMode: 'HH:MM',
                timeSeparators: ['h'],
                typedDigits: '050220040341',
                formattedValue: '05.02.2004, 03h41',
            },
            {
                timeMode: 'HH:MM',
                timeSeparators: [' h '],
                typedDigits: '050220040341',
                formattedValue: '05.02.2004, 03 h 41',
            },
            {
                timeMode: 'HH:MM:SS',
                timeSeparators: [' h ', ' min '],
                typedDigits: '10062007034111',
                formattedValue: '10.06.2007, 03 h 41 min 11',
            },
            {
                timeMode: 'HH:MM:SS.MSS',
                timeSeparators: [':', ':', ','],
                typedDigits: '15081999034111111',
                formattedValue: '15.08.1999, 03:41:11,111',
            },
            {
                timeMode: 'HH:MM:SS.MSS',
                timeSeparators: ['.'],
                typedDigits: '15081999034111111',
                formattedValue: '15.08.1999, 03.41:11.111',
            },
            {
                timeMode: 'HH:MM:SS',
                timeSeparators: [],
                typedDigits: '10062007034111',
                formattedValue: '10.06.2007, 03:41:11',
            },
        ] as const;

        testCases.forEach(({timeMode, timeSeparators, typedDigits, formattedValue}) => {
            it(`${timeMode} + ${JSON.stringify(timeSeparators)}: ${typedDigits} => ${formattedValue}`, () => {
                const options = maskitoDateTime({
                    dateMode: 'dd/mm/yyyy',
                    timeMode,
                    timeSeparators,
                });

                expect(maskitoTransform(typedDigits, options)).toBe(formattedValue);
            });
        });
    });

    it('keeps separators of incomplete time', () => {
        const options = maskitoDateTime({
            dateMode: 'dd/mm/yyyy',
            timeMode: 'HH:MM:SS',
            timeSeparators: [' h ', ' min '],
        });

        expect(maskitoTransform('05022004034', options)).toBe('05.02.2004, 03 h 4');
    });

    it('works together with custom date & date-time separators (fr-CA style)', () => {
        const options = maskitoDateTime({
            dateMode: 'yyyy/mm/dd',
            dateSeparator: '-',
            dateTimeSeparator: ' ',
            timeMode: 'HH:MM:SS',
            timeSeparators: [' h ', ' min '],
        });

        expect(maskitoTransform('20250510183005', options)).toBe(
            '2025-05-10 18 h 30 min 05',
        );
    });

    it('works together with 12-hour format', () => {
        const options = maskitoDateTime({
            dateMode: 'dd/mm/yyyy',
            timeMode: 'HH:MM',
            timeSeparators: ['.'],
            dayPeriod: ['AM', 'PM'],
        });

        expect(maskitoTransform('050220040341p', options)).toBe('05.02.2004, 03.41 PM');
    });

    describe('min / max', () => {
        const options = maskitoDateTime({
            dateMode: 'dd/mm/yyyy',
            timeMode: 'HH:MM',
            timeSeparators: [' h '],
            min: new Date(2004, 1, 5, 12, 30),
            max: new Date(2004, 1, 5, 18, 45),
        });

        it('clamps value to min without losing separators', () => {
            expect(maskitoTransform('050220040000', options)).toBe('05.02.2004, 12 h 30');
        });

        it('clamps value to max without losing separators', () => {
            expect(maskitoTransform('050220042359', options)).toBe('05.02.2004, 18 h 45');
        });

        it('keeps valid value as is', () => {
            expect(maskitoTransform('050220041505', options)).toBe('05.02.2004, 15 h 05');
        });
    });

    describe('locale', () => {
        it('derives time separators from locale (da-DK)', () => {
            const options = maskitoDateTime({locale: 'da-DK'});

            expect(maskitoTransform('100520251830', options)).toBe('10.05.2025, 18.30');
        });

        it('explicit timeSeparators overrides locale ones', () => {
            const options = maskitoDateTime({locale: 'da-DK', timeSeparators: [':']});

            expect(maskitoTransform('100520251830', options)).toBe('10.05.2025, 18:30');
        });
    });

    describe('maskitoParseDateTime & maskitoStringifyDateTime', () => {
        const params = {
            dateMode: 'dd/mm/yyyy',
            dateTimeSeparator: ' ',
            timeMode: 'HH:MM:SS',
            timeSeparators: [' h ', ' min '],
        } as const;

        const date = new Date(2025, 4, 10, 18, 30, 5);
        const formattedValue = '10.05.2025 18 h 30 min 05';

        it('stringifies date with custom time separators', () => {
            expect(maskitoStringifyDateTime(date, params)).toBe(formattedValue);
        });

        it('parses date with custom time separators', () => {
            expect(maskitoParseDateTime(formattedValue, params)).toEqual(date);
        });

        it('round-trips through stringify <=> parse', () => {
            expect(
                maskitoParseDateTime(maskitoStringifyDateTime(date, params), params),
            ).toEqual(date);
        });
    });
});
