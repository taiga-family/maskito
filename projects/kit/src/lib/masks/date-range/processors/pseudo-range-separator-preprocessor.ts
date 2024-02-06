import {MaskitoPreprocessor} from '@maskito/core';

import {POSSIBLE_DATE_RANGE_SEPARATOR} from '../constants';

/**
 * It replaces pseudo range separators with valid one.
 * @example User types hyphen / en-dash / em-dash / minus => it is replaced with valid range separator.
 */
export function createPseudoRangeSeparatorPreprocessor({
    rangeSeparator,
    dateSeparator,
}: {
    rangeSeparator: string;
    dateSeparator: string;
}): MaskitoPreprocessor {
    const pseudoRangeSeparators = POSSIBLE_DATE_RANGE_SEPARATOR.filter(
        x => !rangeSeparator.includes(x) && x !== dateSeparator,
    ).join('');
    const pseudoRangeSeparatorsRE = new RegExp(`[${pseudoRangeSeparators}]`, 'gi');

    return ({elementState, data}) => {
        const {value, selection} = elementState;

        return {
            elementState: {
                selection,
                value: value.replace(pseudoRangeSeparatorsRE, rangeSeparator),
            },
            data: data.replace(pseudoRangeSeparatorsRE, rangeSeparator),
        };
    };
}
