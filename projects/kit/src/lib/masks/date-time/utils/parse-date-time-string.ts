import {DATE_TIME_SEPARATOR} from '../constants';

export function parseDateTimeString(
    dateTime: string,
    dateModeTemplate: string,
): string[] {
    const hasSeparator = dateTime.includes(DATE_TIME_SEPARATOR);

    return [
        dateTime.slice(0, dateModeTemplate.length),
        dateTime.slice(
            hasSeparator
                ? dateModeTemplate.length + DATE_TIME_SEPARATOR.length
                : dateModeTemplate.length,
        ),
    ];
}
