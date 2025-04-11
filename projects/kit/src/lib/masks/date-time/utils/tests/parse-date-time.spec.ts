import {DEFAULT_MAX_DATE, DEFAULT_MIN_DATE} from '../../../../constants';
import {maskitoParseDateTime} from '../parse-date-time';

describe('maskitoParseDateTime', () => {
    const dateMode = 'dd/mm/yyyy';
    const timeMode = 'HH:MM';
    const dateTimeSeparator = ', ';

    it('returns null for incomplete date-time string', () => {
        expect(
            maskitoParseDateTime('02/11/a2018', {dateMode, timeMode, dateTimeSeparator}),
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
            maskitoParseDateTime('31/12/9999, 00:00', {
                dateMode,
                timeMode,
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
});
