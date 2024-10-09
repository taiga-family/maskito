import type {MaskitoPostprocessor, MaskitoPreprocessor} from '@maskito/core';

import {
    ALL_MERIDIEM_CHARACTERS_RE,
    ANY_MERIDIEM_CHARACTER_RE,
    CHAR_NO_BREAK_SPACE,
} from '../constants';
import type {MaskitoTimeMode} from '../types';
import {identity} from '../utils';

export function createMeridiemPreprocessor(
    timeMode: MaskitoTimeMode,
): MaskitoPreprocessor {
    if (!timeMode.includes('AA')) {
        return identity;
    }

    const mainMeridiemCharRE = /^[AP]$/gi;

    return ({elementState, data}) => {
        const {value, selection} = elementState;
        const newValue = value.toUpperCase();
        const newData = data.toUpperCase();

        if (
            newValue.match(ALL_MERIDIEM_CHARACTERS_RE) &&
            newData.match(mainMeridiemCharRE)
        ) {
            return {
                elementState: {
                    value: newValue.replaceAll(ALL_MERIDIEM_CHARACTERS_RE, ''),
                    selection,
                },
                data: `${newData}M`,
            };
        }

        return {elementState: {selection, value: newValue}, data: newData};
    };
}

export function createMeridiemPostprocessor(
    timeMode: MaskitoTimeMode,
): MaskitoPostprocessor {
    if (!timeMode.includes('AA')) {
        return identity;
    }

    return ({value, selection}, initialElementState) => {
        if (
            !value.match(ANY_MERIDIEM_CHARACTER_RE) ||
            value.match(ALL_MERIDIEM_CHARACTERS_RE)
        ) {
            return {value, selection};
        }

        const [from, to] = selection;

        // any meridiem character was deleted
        if (initialElementState.value.match(ALL_MERIDIEM_CHARACTERS_RE)) {
            const newValue = value.replace(ANY_MERIDIEM_CHARACTER_RE, '');

            return {
                value: newValue,
                selection: [
                    Math.min(from, newValue.length),
                    Math.min(to, newValue.length),
                ],
            };
        }

        const fullMeridiem = `${CHAR_NO_BREAK_SPACE}${value.includes('P') ? 'P' : 'A'}M`;
        const newValue = value.replace(ANY_MERIDIEM_CHARACTER_RE, (x) =>
            x !== CHAR_NO_BREAK_SPACE ? fullMeridiem : x,
        );

        return {
            value: newValue,
            selection:
                to >= newValue.indexOf(fullMeridiem)
                    ? [newValue.length, newValue.length]
                    : selection,
        };
    };
}
