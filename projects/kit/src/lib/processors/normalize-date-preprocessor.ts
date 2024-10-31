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
        const dateSegments = data.split(/\D/).filter(Boolean);
        const templateSegments = dateModeTemplate.split(dateSegmentsSeparator);
        const includesTime = data.includes(dateTimeSeparator);

        let newData = data;
        const dates: string[] = [];
        let dateParts: string[] = [];
        const timeParts: string[] = [];

        for (let index = 0; index < dateSegments.length; index++) {
            const segment = dateSegments[index]!;
            const template = templateSegments[index % templateSegments.length];
            const isLastTemplateSegment =
                index % templateSegments.length === templateSegments.length - 1;

            if (index >= templateSegments.length && includesTime) {
                timeParts.push(segment);
                continue;
            }

            if (template) {
                if (isLastTemplateSegment) {
                    dateParts.push(segment);
                    dates.push(dateParts.join(dateSegmentsSeparator));
                    dateParts = [];
                } else {
                    dateParts.push(normalizeDateSegment(segment, template));
                }
            }
        }

        if (dates.length > 0 && dateParts.length === 0) {
            if (timeParts.length > 0) {
                newData = `${dates[0]}${dateTimeSeparator}${timeParts.join(':')}`;
            } else {
                newData = dates.join(rangeSeparator);
            }
        }

        return {elementState, data: newData};
    };
}

function normalizeDateSegment(
    dateSegment: string,
    templateSegment: string | undefined,
): string {
    return dateSegment.padStart(templateSegment?.length ?? 0, '0');
}
