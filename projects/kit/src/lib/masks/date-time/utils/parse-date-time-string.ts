import {DATE_TIME_SEPARATOR} from '../constants';

export function parseDateTimeString(
    dateTime: string,
    dateModeTemplate: string,
    dateTimeSeparator = DATE_TIME_SEPARATOR,
): string[] {
    const hasSeparator = dateTime.includes(dateTimeSeparator);

    return [
        dateTime.slice(0, dateModeTemplate.length),
        dateTime.slice(
            hasSeparator
                ? dateModeTemplate.length + dateTimeSeparator.length
                : dateModeTemplate.length,
        ),
    ];
}
