import type {MaskitoPreprocessor} from '@maskito/core';

import {escapeRegExp, identity} from '../../../utils';
import type {MaskitoNumberParams} from '../number-params';
import {toNumberParts} from '../utils';

/**
 * It rejects new typed decimal separator if it already exists in text field.
 * Behaviour is similar to native <input type="number"> (Chrome).
 * @example 1|23,45 => Press comma (decimal separator) => 1|23,45 (do nothing).
 */
export function createRepeatedDecimalSeparatorPreprocessor(
    params: Pick<
        Required<MaskitoNumberParams>,
        | 'decimalPseudoSeparators'
        | 'decimalSeparator'
        | 'minusPseudoSigns'
        | 'minusSign'
        | 'postfix'
        | 'prefix'
    >,
): MaskitoPreprocessor {
    const {decimalSeparator} = params;

    if (!decimalSeparator) {
        return identity;
    }

    return ({elementState, data}) => {
        const {value, selection} = elementState;
        const [from, to] = selection;

        return {
            elementState,
            data:
                !toNumberParts(value, params).decimalSeparator ||
                value.slice(from, to + 1).includes(decimalSeparator)
                    ? data
                    : data.replaceAll(
                          new RegExp(escapeRegExp(decimalSeparator), 'gi'),
                          '',
                      ),
        };
    };
}
