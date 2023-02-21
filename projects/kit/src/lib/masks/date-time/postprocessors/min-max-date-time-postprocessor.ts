import {MaskitoOptions} from '@maskito/core';

import {DEFAULT_MAX_DATE, DEFAULT_MIN_DATE} from '../../../constants';
import {MaskitoTimeMode} from '../../../types';
import {
    clamp,
    dateToSegments,
    parseDateString,
    segmentsToDate,
    toDateString,
} from '../../../utils';
import {parseTimeString} from '../../../utils/time';
import {isDateTimeStringCompleted, parseDateTimeString} from '../utils';

export function createMinMaxDateTimePostprocessor({
    dateModeTemplate,
    min = DEFAULT_MIN_DATE,
    max = DEFAULT_MAX_DATE,
    timeMode,
}: {
    dateModeTemplate: string;
    timeMode: MaskitoTimeMode;
    min?: Date;
    max?: Date;
}): NonNullable<MaskitoOptions['postprocessor']> {
    return ({value, selection}) => {
        const [dateString, timeString] = parseDateTimeString(value, dateModeTemplate);

        if (!isDateTimeStringCompleted(value, dateModeTemplate, timeMode)) {
            return {
                selection,
                value: value,
            };
        }

        const parsedDate = parseDateString(dateString, dateModeTemplate);
        const parsedTime = parseTimeString(timeString);
        const date = segmentsToDate(parsedDate, parsedTime);
        const clampedDate = clamp(date, min, max);

        const validatedValue = toDateString(
            dateToSegments(clampedDate),
            dateModeTemplate,
            timeMode,
        );

        return {
            selection,
            value: validatedValue,
        };
    };
}
