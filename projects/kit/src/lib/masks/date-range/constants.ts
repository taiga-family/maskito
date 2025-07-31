import {
    CHAR_EM_DASH,
    CHAR_EN_DASH,
    CHAR_HYPHEN,
    CHAR_JP_HYPHEN,
    CHAR_MINUS,
} from '../../constants';

export const POSSIBLE_DATE_RANGE_SEPARATOR = [
    CHAR_HYPHEN,
    CHAR_EN_DASH,
    CHAR_EM_DASH,
    CHAR_MINUS,
    CHAR_JP_HYPHEN,
];

export const MIN_DAY = 1;

export const MONTHS_IN_YEAR = 12;

export const MonthNumber = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
} as const;
