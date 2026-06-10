import type {MaskitoPreprocessor} from '@maskito/core';

import type {MaskitoTimeSegments} from '../../../types';
import {validateDateString} from '../../../utils';
import {skipNonDigitCharacters} from '../../../utils/skip-non-digit-characters';
import {enrichTimeSegmentsWithZeroes} from '../../../utils/time';
import {type MaskitoTimeParams} from '../../time/time-params';
import {splitDateTimeString} from '../utils';

export function createValidDateTimePreprocessor({
    dateModeTemplate,
    dateSeparator,
    dateTimeSeparator,
    mode: timeMode,
    timeSegmentMaxValues,
    separators,
}: Pick<Required<MaskitoTimeParams>, 'mode' | 'separators'> & {
    dateModeTemplate: string;
    dateSeparator: string;
    dateTimeSeparator: string;
    timeSegmentMaxValues: MaskitoTimeSegments<number>;
}): MaskitoPreprocessor {
    return ({elementState, data}) => {
        const {value, selection} = elementState;

        if (data === dateSeparator) {
            return {
                elementState,
                data: selection[0] === value.length ? data : '',
            };
        }

        const newCharacters = data.replaceAll(/\D/g, '');

        if (!newCharacters) {
            return {elementState, data};
        }

        const [from, rawTo] = skipNonDigitCharacters(value, selection);
        let to = rawTo + data.length;
        const newPossibleValue = `${value.slice(0, from)}${newCharacters}${value.slice(to)}`;

        const [dateString, timeString] = splitDateTimeString(
            newPossibleValue,
            dateModeTemplate,
        );

        let validatedValue = '';
        const hasDateTimeSeparator = newPossibleValue.includes(dateTimeSeparator);

        const {validatedDateString, updatedSelection} = validateDateString({
            dateString,
            dateSeparator,
            dateModeTemplate,
            offset: 0,
            selection: [from, to],
        });

        if (dateString && !validatedDateString) {
            return {elementState, data: ''}; // prevent changes
        }

        to = updatedSelection[1];

        validatedValue += validatedDateString;

        const updatedTimeState = enrichTimeSegmentsWithZeroes(
            {value: timeString, selection: [from, to]},
            {mode: timeMode, separators, timeSegmentMaxValues},
        );

        to = updatedTimeState.selection[1];

        validatedValue += hasDateTimeSeparator
            ? `${dateTimeSeparator}${updatedTimeState.value}`
            : updatedTimeState.value;

        const newData = validatedValue.slice(from, to);

        return {
            elementState: {
                selection: [from, rawTo],
                value: `${validatedValue.slice(0, from)}${newData
                    .split(dateSeparator)
                    .map((segment) => '0'.repeat(segment.length))
                    .join(dateSeparator)}${validatedValue.slice(to)}`,
            },
            data: newData,
        };
    };
}
