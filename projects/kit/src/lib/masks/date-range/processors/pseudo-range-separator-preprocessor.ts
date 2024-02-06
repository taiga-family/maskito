import {MaskitoPreprocessor} from '@maskito/core';

import {POSSIBLE_DATE_RANGE_SEPARATOR} from '../constants';

/**
 * It replaces pseudo range separators with valid one.
 * @example User types hyphen / en-dash / em-dash / minus => it is replaced with valid range separator.
 */
export function createPseudoRangeSeparatorPreprocessor(
    rangeSeparator: string,
): MaskitoPreprocessor {
    const pseudoSeparatorsRegExp = new RegExp(
        `[${POSSIBLE_DATE_RANGE_SEPARATOR.join('')}]`,
        'gi',
    );

    return ({elementState, data}) => {
        const {value, selection} = elementState;

        return {
            elementState: {
                selection,
                value: value.replace(pseudoSeparatorsRegExp, rangeSeparator),
            },
            data: data.replace(pseudoSeparatorsRegExp, rangeSeparator),
        };
    };
}
