import {DATE_TIME_SEPARATOR} from '../constants';

export function isDateTimeStringComplete(
    dateTimeString: string,
    dateMode: string,
    timeMode: string,
): boolean {
    return (
        dateTimeString.length >=
            dateMode.length + timeMode.length + DATE_TIME_SEPARATOR.length &&
        dateTimeString
            .split(DATE_TIME_SEPARATOR)[0]
            .split(/\D/)
            .every(segment => !segment.match(/^0+$/))
    );
}
