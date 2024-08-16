import type {MaskitoTimeMode} from '../../../types';
import {DATE_TIME_SEPARATOR} from '../constants';

export function isDateTimeStringComplete(
    dateTimeString: string,
    {
        dateMode,
        timeMode,
        dateTimeSeparator = DATE_TIME_SEPARATOR,
    }: {
        dateMode: string;
        timeMode: MaskitoTimeMode;
        dateTimeSeparator: string;
    },
): boolean {
    return (
        dateTimeString.length >=
            dateMode.length + timeMode.length + dateTimeSeparator.length &&
        (dateTimeString.split(dateTimeSeparator)[0] || '')
            .split(/\D/)
            .every((segment) => !segment.match(/^0+$/))
    );
}
