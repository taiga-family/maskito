const NON_DIGIT_PLACEHOLDER_RE = /[^dmy]/g;
const LEADING_NON_DIGIT_RE = /^\D*/;

export function parseDateTimeString(
    dateTime: string,
    dateModeTemplate: string,
): [date: string, time: string] {
    const dateDigitsCount = dateModeTemplate.replaceAll(
        NON_DIGIT_PLACEHOLDER_RE,
        '',
    ).length;
    const [date = ''] =
        new RegExp(`(\\d\\D?){0,${dateDigitsCount - 1}}\\d?`).exec(dateTime) || [];
    const [dateTimeSeparator = ''] =
        LEADING_NON_DIGIT_RE.exec(dateTime.slice(date.length)) || [];

    return [date, dateTime.slice(date.length + dateTimeSeparator.length)];
}
