import {MIN_DAY, MonthNumber, MONTHS_IN_YEAR} from '../../masks/date-range/constants';
import type {MaskitoDateSegments} from '../../types';

export function appendDate(
    date: Date,
    {day = 0, month = 0, year = 0}: Partial<MaskitoDateSegments<number>> = {},
): Date {
    if (day === 0 && month === 0 && year === 0) {
        return date;
    }

    const initialYear = date.getFullYear();
    const initialMonth = date.getMonth();
    const initialDate = date.getDate();

    const totalMonths = (initialYear + year) * MONTHS_IN_YEAR + initialMonth + month;
    let years = Math.floor(totalMonths / MONTHS_IN_YEAR);
    let months = totalMonths % MONTHS_IN_YEAR;

    const monthDaysCount = getMonthDaysCount(months, isLeapYear(years));
    const currentMonthDaysCount = getMonthDaysCount(initialMonth, isLeapYear(years));
    let days = day;

    if (initialDate >= monthDaysCount) {
        days += initialDate - (currentMonthDaysCount - monthDaysCount);
    } else if (
        currentMonthDaysCount < monthDaysCount &&
        initialDate === currentMonthDaysCount
    ) {
        days += initialDate + (monthDaysCount - currentMonthDaysCount);
    } else {
        days += initialDate;
    }

    while (days > getMonthDaysCount(months, isLeapYear(years))) {
        days -= getMonthDaysCount(months, isLeapYear(years));

        if (months === MonthNumber.December) {
            years++;
            months = MonthNumber.January;
        } else {
            months++;
        }
    }

    while (days < MIN_DAY) {
        if (months === MonthNumber.January) {
            years--;
            months = MonthNumber.December;
        } else {
            months--;
        }

        days += getMonthDaysCount(months, isLeapYear(years));
    }

    days =
        day < 0 || month < 0 || year < 0
            ? days + 1 // add one day when moving days, or months, or years backward
            : days - 1; // "from"-day is included in the range

    return new Date(years, months, days);
}

function getMonthDaysCount(month: number, isLeapYear: boolean): number {
    switch (month) {
        case MonthNumber.April:
        case MonthNumber.June:
        case MonthNumber.November:
        case MonthNumber.September:
            return 30;
        case MonthNumber.February:
            return isLeapYear ? 29 : 28;
        default:
            return 31;
    }
}

function isLeapYear(year: number): boolean {
    return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}
