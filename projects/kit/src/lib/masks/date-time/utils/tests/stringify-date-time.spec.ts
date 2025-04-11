import {maskitoStringifyDateTime} from '../stringify-date-time';

describe('maskitoStringifyDateTime', () => {
    const date = new Date(2025, 3, 11, 15, 30, 45);
    const dateMode = 'dd/mm/yyyy';
    const timeMode = 'HH:MM:SS';
    const dateSeparator = '/';
    const dateTimeSeparator = ', ';

    it('should stringify date and time with default separator', () => {
        const result = maskitoStringifyDateTime(date, {
            dateMode,
            timeMode,
            dateSeparator,
            dateTimeSeparator,
        });

        expect(result).toBe('11/04/2025, 15:30:45');
    });

    it('should stringify date and time with custom separator', () => {
        const result = maskitoStringifyDateTime(date, {
            dateMode,
            timeMode,
            dateSeparator,
            dateTimeSeparator: ' | ',
        });

        expect(result).toBe('11/04/2025 | 15:30:45');
    });

    it('should clamp date to min boundary', () => {
        const minDate = new Date('2025-04-12T00:00:00.000');
        const result = maskitoStringifyDateTime(date, {
            dateMode,
            timeMode,
            dateSeparator,
            min: minDate,
        });

        expect(result).toBe('12/04/2025, 00:00:00');
    });

    it('should clamp date to max boundary', () => {
        const maxDate = new Date('2025-04-10T23:59:59.999');
        const result = maskitoStringifyDateTime(date, {
            dateMode,
            timeMode,
            dateSeparator,
            max: maxDate,
        });

        expect(result).toBe('10/04/2025, 23:59:59');
    });

    it('should handle edge cases for leap years', () => {
        const leapYearDate = new Date('2024-02-29T12:00:00.000');
        const result = maskitoStringifyDateTime(leapYearDate, {
            dateMode,
            timeMode,
            dateSeparator,
        });

        expect(result).toBe('29/02/2024, 12:00:00');
    });

    it('should handle edge cases for time boundaries', () => {
        const midnight = new Date('2025-04-11T00:00:00.000');
        const resultMidnight = maskitoStringifyDateTime(midnight, {
            dateMode,
            timeMode,
            dateSeparator,
        });

        expect(resultMidnight).toBe('11/04/2025, 00:00:00');

        const endOfDay = new Date('2025-04-11T23:59:59.999');
        const resultEndOfDay = maskitoStringifyDateTime(endOfDay, {
            dateMode,
            timeMode,
            dateSeparator,
        });

        expect(resultEndOfDay).toBe('11/04/2025, 23:59:59');
    });
});
