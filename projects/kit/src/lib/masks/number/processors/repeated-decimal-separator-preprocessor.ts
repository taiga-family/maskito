import {MaskitoPreprocessor} from '@maskito/core';

import {escapeRegExp} from '../../../utils';

/**
 * It rejects new typed decimal separator if it already exists in text field.
 * Behaviour is similar to native <input type="number"> (Chrome).
 * @example 1|23,45 => Press comma (decimal separator) => 1|23,45 (do nothing).
 */
export function createRepeatedDecimalSeparatorPreprocessor(
    decimalSeparator: string,
): MaskitoPreprocessor {
    return ({elementState, data}) => {
        const {value, selection} = elementState;
        const [from, to] = selection;

        return {
            elementState,
            data:
                !value.includes(decimalSeparator) ||
                value.slice(from, to + 1).includes(decimalSeparator)
                    ? data
                    : data.replace(new RegExp(escapeRegExp(decimalSeparator), 'gi'), ''),
        };
    };
}
