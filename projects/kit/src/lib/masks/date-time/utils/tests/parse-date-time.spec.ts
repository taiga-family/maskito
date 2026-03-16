import {DEFAULT_MAX_DATE, DEFAULT_MIN_DATE} from '../../../../constants';
import type {MaskitoDateTimeParams} from '../../date-time-params';
import {maskitoParseDateTime} from '../parse-date-time';

describe('maskitoParseDateTime', () => {
    const dateMode = 'dd/mm/yyyy';
    const timeMode = 'HH:MM';
    const dateTimeSeparator = ', ';

    it('returns null for incomplete date-time string', () => {
        expect(
            maskitoParseDateTime('02/11/2018', {dateMode, timeMode, dateTimeSeparator}),
        ).toBeNull();
        expect(
            maskitoParseDateTime('16:20', {dateMode, timeMode, dateTimeSeparator}),
        ).toBeNull();
    });

    it('parses valid date-time string', () => {
        expect(
            maskitoParseDateTime('02/11/2018, 16:20', {
                dateMode,
                timeMode,
                dateTimeSeparator,
            }),
        ).toEqual(new Date(2018, 10, 2, 16, 20));
    });

    it('clamps date-time to min and max bounds', () => {
        const min = new Date(2020, 0, 1, 10, 1);
        const max = new Date(2025, 11, 31, 11, 1);

        expect(
            maskitoParseDateTime('01/01/2019, 10:00', {
                dateMode,
                timeMode,
                dateTimeSeparator,
                min,
                max,
            }),
        ).toEqual(min);

        expect(
            maskitoParseDateTime('01/01/2030, 10:00', {
                dateMode,
                timeMode,
                dateTimeSeparator,
                min,
                max,
            }),
        ).toEqual(max);
    });

    it('handles default min and max bounds', () => {
        expect(
            maskitoParseDateTime('01/01/0001, 00:00', {
                dateMode,
                timeMode,
                dateTimeSeparator,
            }),
        ).toEqual(DEFAULT_MIN_DATE);

        expect(
            maskitoParseDateTime('31/12/9999, 23:59:59.999', {
                dateMode,
                timeMode: 'HH:MM:SS.MSS',
                dateTimeSeparator,
            }),
        ).toEqual(DEFAULT_MAX_DATE);
    });

    it('parses date-time with custom separator', () => {
        const customSeparator = 'T';

        expect(
            maskitoParseDateTime('02/11/2018T16:20', {
                dateMode,
                timeMode,
                dateTimeSeparator: customSeparator,
            }),
        ).toEqual(new Date(2018, 10, 2, 16, 20));
    });

    it('returns null for missing date-time separator', () => {
        expect(
            maskitoParseDateTime('02/11/201816:20', {
                dateMode,
                timeMode,
                dateTimeSeparator,
            }),
        ).toBeNull();
    });

    it('handles edge cases for leap years', () => {
        expect(
            maskitoParseDateTime('29/02/2020, 12:00', {
                dateMode,
                timeMode,
                dateTimeSeparator,
            }),
        ).toEqual(new Date(2020, 1, 29, 12, 0));
        expect(
            maskitoParseDateTime('29/02/2019, 12:00', {
                dateMode,
                timeMode,
                dateTimeSeparator,
            }),
        ).toEqual(new Date(2019, 2, 1, 12, 0));
    });

    it('handles edge cases for time boundaries', () => {
        expect(
            maskitoParseDateTime('31/12/2018, 00:00', {
                dateMode,
                timeMode,
                dateTimeSeparator,
            }),
        ).toEqual(new Date(2018, 11, 31, 0, 0));
        expect(
            maskitoParseDateTime('31/12/2018, 23:59', {
                dateMode,
                timeMode,
                dateTimeSeparator,
            }),
        ).toEqual(new Date(2018, 11, 31, 23, 59));
    });

    it('returns null for empty or whitespace-only input', () => {
        expect(
            maskitoParseDateTime('', {dateMode, timeMode, dateTimeSeparator}),
        ).toBeNull();
        expect(
            maskitoParseDateTime('   ', {dateMode, timeMode, dateTimeSeparator}),
        ).toBeNull();
    });

    it('parses date-time with dd/mm date mode without year', () => {
        expect(
            maskitoParseDateTime('25/12, 16:20', {
                dateMode: 'dd/mm',
                timeMode,
                dateTimeSeparator,
            })?.getTime(),
        ).toBe(Date.parse('0000-12-25T16:20:00.000'));
    });

    it('parses date-time with mm/dd date mode without year', () => {
        expect(
            maskitoParseDateTime('12/25, 16:20', {
                dateMode: 'mm/dd',
                timeMode,
                dateTimeSeparator,
            })?.getTime(),
        ).toBe(Date.parse('0000-12-25T16:20:00.000'));
    });

    it('handles invalid date-time separator', () => {
        expect(
            maskitoParseDateTime('31/12/2018-16:20', {
                dateMode,
                timeMode,
                dateTimeSeparator,
            }),
        ).toBeNull();
        expect(
            maskitoParseDateTime('31/12/2018 16:20', {
                dateMode,
                timeMode,
                dateTimeSeparator,
            }),
        ).toBeNull();
    });

    it('handles mixed valid and invalid inputs', () => {
        expect(
            maskitoParseDateTime('31/12/2018, invalid', {
                dateMode,
                timeMode,
                dateTimeSeparator,
            }),
        ).toBeNull();
        expect(
            maskitoParseDateTime('invalid, 16:20', {
                dateMode,
                timeMode,
                dateTimeSeparator,
            }),
        ).toBeNull();
    });

    describe('invalid date-time strings', () => {
        const params: MaskitoDateTimeParams = {dateMode, timeMode, dateTimeSeparator};

        it.each([
            'this-is-not-a-datetime',
            '',
            '   ',
            '02//2018, 16:20',
            '/11/2018, 16:20',
            '02/11/, 16:20',
            '02/11/20, 16:20',
            '02/11/abcd, 16:20',
            '1a/11/2018, 16:20',
        ])('should return null for invalid date part "%s"', (value) =>
            expect(maskitoParseDateTime(value, params)).toBeNull(),
        );

        it.each(['02/11/2018, 16:ab', '02/11/2018, aa:20'])(
            'should return null for invalid time part "%s"',
            (value) => expect(maskitoParseDateTime(value, params)).toBeNull(),
        );
    });
});
