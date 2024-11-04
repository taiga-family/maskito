import type {MaskitoPreprocessor} from '@maskito/core';

import {DATE_TIME_SEPARATOR} from '../masks/date-time/constants';

export function normalizeDatePreprocessor({
    dateModeTemplate,
    dateSegmentsSeparator,
    rangeSeparator = '',
    dateTimeSeparator = DATE_TIME_SEPARATOR,
}: {
    dateModeTemplate: string;
    dateSegmentsSeparator: string;
    rangeSeparator?: string;
    dateTimeSeparator?: string;
}): MaskitoPreprocessor {
    return ({elementState, data}) => {
        const dateTimeSegments = data.split(/\D/).filter(Boolean);
        const templateSegments = dateModeTemplate.split(dateSegmentsSeparator);
        const includesTime = data.includes(dateTimeSeparator);

        const dateSegments = dateTimeSegments.slice(
            0,
            includesTime ? templateSegments.length : Infinity,
        );

        if (!dateSegments.length || dateSegments.length % templateSegments.length !== 0) {
            return {elementState, data};
        }

        const dates = dateSegments.reduce<string[]>((dates, segment, index) => {
            const template = templateSegments[index % templateSegments.length];
            const dateIndex = Math.trunc(index / templateSegments.length);
            const isLastDateSegment =
                index % templateSegments.length === templateSegments.length - 1;

            if (!dates[dateIndex]) {
                dates[dateIndex] = '';
            }

            dates[dateIndex] += isLastDateSegment
                ? segment
                : `${segment.padStart(template?.length ?? 0, '0')}${dateSegmentsSeparator}`;

            return dates;
        }, []);

        return {
            elementState,
            data: includesTime
                ? `${dates[0]}${data.slice(data.indexOf(dateTimeSeparator))}`
                : dates.join(rangeSeparator),
        };
    };
}
