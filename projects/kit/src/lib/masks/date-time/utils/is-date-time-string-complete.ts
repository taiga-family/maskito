import {createTimeModeTemplate} from '../../../utils/time/create-time-mode-template';
import type {MaskitoDateTimeParams} from '../date-time-params';

export function isDateTimeStringComplete(
    dateTimeString: string,
    {
        dateMode,
        timeMode,
        timeSeparators,
        dateTimeSeparator,
    }: Pick<
        Required<MaskitoDateTimeParams>,
        'dateTimeSeparator' | 'timeMode' | 'timeSeparators'
    > & {
        dateMode: string;
    },
): boolean {
    const timeModeTemplate = createTimeModeTemplate({
        mode: timeMode,
        separators: timeSeparators,
    });

    return (
        dateTimeString.length >=
            dateMode.length + timeModeTemplate.length + dateTimeSeparator.length &&
        (dateTimeString.split(dateTimeSeparator)[0] ?? '')
            .split(/\D/)
            .every((segment) => !/^0+$/.exec(segment))
    );
}
