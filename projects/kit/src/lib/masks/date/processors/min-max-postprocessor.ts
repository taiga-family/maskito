import {MaskitoOptions} from '@maskito/core';

import {parseDateString, toDateString} from '../../../utils';
import {dateToSegments, segmentsToDate} from '../utils';

export function createMinMaxValuePostprocessor(
    {
        min = new Date('0001-01-01'),
        max = new Date('9999-12-31'),
    }: {
        min?: Date;
        max?: Date;
    },
    fullDateMode: string,
): NonNullable<MaskitoOptions['postprocessor']> {
    return elementState => {
        const {value, selection} = elementState;

        if (value.length < fullDateMode.length) {
            return elementState;
        }

        const parsedDate = parseDateString(value, fullDateMode);
        const date = segmentsToDate(parsedDate);

        if (date < min || date > max) {
            const finalValue = toDateString(
                dateToSegments(date < min ? min : max),
                fullDateMode,
            );

            return {
                selection,
                value: finalValue,
            };
        }

        return elementState;
    };
}
