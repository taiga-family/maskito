import {DATE_TIME_SEPARATOR} from '../constants';

export function isDateTimeStringCompleted(
    dateTimeString: string,
    dateMode: string,
    timeMode: string,
): boolean {
    if (
        dateTimeString.length <
        dateMode.length + timeMode.length + DATE_TIME_SEPARATOR.length
    ) {
        return false;
    }

    return dateTimeString
        .split(DATE_TIME_SEPARATOR)[0]
        .split(/\D/)
        .every(segment => !segment.match(/^0+$/));
}
