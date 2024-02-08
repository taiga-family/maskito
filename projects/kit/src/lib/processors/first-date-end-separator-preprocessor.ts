import {MaskitoPreprocessor} from '@maskito/core';

import {getFirstCompleteDate} from '../utils';

/**
 * It replaces pseudo range separators with valid one.
 * @example '01.01.2000_11.11.2000' -> '01.01.2000 - 01.01.2000'
 * @example '01.01.2000_23:59' -> '01.01.2000, 23:59'
 */
export function createFirstDateEndSeparatorPreprocessor({
    dateModeTemplate,
    firstDateEndSeparator,
    dateSegmentSeparator,
    pseudoFirstDateEndSeparators,
}: {
    dateModeTemplate: string;
    firstDateEndSeparator: string;
    dateSegmentSeparator: string;
    pseudoFirstDateEndSeparators: string[];
}): MaskitoPreprocessor {
    return ({elementState, data}) => {
        const {value, selection} = elementState;
        const firstCompleteDate = getFirstCompleteDate(value, dateModeTemplate);
        const pseudoSeparators = pseudoFirstDateEndSeparators.filter(
            x => !firstDateEndSeparator.includes(x) && x !== dateSegmentSeparator,
        );
        const pseudoSeparatorsRE = new RegExp(`[${pseudoSeparators.join('')}]`, 'gi');

        return {
            elementState: {
                selection,
                value:
                    firstCompleteDate && value.length > firstCompleteDate.length
                        ? firstCompleteDate +
                          value
                              .slice(firstCompleteDate.length)
                              .replace(/^[\D\s]*/, firstDateEndSeparator)
                        : value,
            },
            data: data.replace(pseudoSeparatorsRE, firstDateEndSeparator),
        };
    };
}
