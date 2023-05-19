import {MaskitoPostprocessor} from '@maskito/core';

import {DEFAULT_MAX_DATE, DEFAULT_MIN_DATE} from '../../../constants';
import {MaskitoTimeMode} from '../../../types';
import {
    clamp,
    dateToSegments,
    parseDateString,
    segmentsToDate,
    toDateString,
} from '../../../utils';
import {raiseSegmentValueToMin} from '../../../utils/date/raise-segment-value-to-min';
import {parseTimeString} from '../../../utils/time';
import {isDateTimeStringComplete, parseDateTimeString} from '../utils';

export function createMinMaxDateTimePostprocessor({
    dateModeTemplate,
    timeMode,
    min = DEFAULT_MIN_DATE,
    max = DEFAULT_MAX_DATE,
}: {
    dateModeTemplate: string;
    timeMode: MaskitoTimeMode;
    min?: Date;
    max?: Date;
}): MaskitoPostprocessor {
    return ({value, selection}) => {
        const [dateString, timeString] = parseDateTimeString(value, dateModeTemplate);
        const parsedDate = parseDateString(dateString, dateModeTemplate);
        const parsedTime = parseTimeString(timeString);

        if (!isDateTimeStringComplete(value, dateModeTemplate, timeMode)) {
            const fixedDate = raiseSegmentValueToMin(parsedDate, dateModeTemplate);
            const fixedValue = toDateString(
                {...fixedDate, ...parsedTime},
                dateModeTemplate,
                timeMode,
            );
            const tail = value.slice(fixedValue.length);

            return {
                selection,
                value: fixedValue + tail,
            };
        }

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
