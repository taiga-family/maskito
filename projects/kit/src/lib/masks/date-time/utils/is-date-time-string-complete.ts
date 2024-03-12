import {DATE_TIME_SEPARATOR} from '../constants';

export function isDateTimeStringComplete(
    dateTimeString: string,
    dateMode: string,
    timeMode: string,
    dateTimeSeparator = DATE_TIME_SEPARATOR,
): boolean {
    return (
        dateTimeString.length >=
            dateMode.length + timeMode.length + dateTimeSeparator.length &&
        dateTimeString
            .split(dateTimeSeparator)[0]
            .split(/\D/)
            .every(segment => !segment.match(/^0+$/))
    );
}
