import type {MaskitoPreprocessor} from '@maskito/core';

import type {MaskitoNumberParams} from '../number-params';
import {fromNumberParts, toNumberParts} from '../utils';

/**
 * If minus sign is positioned before prefix,
 * any attempt to erase prefix deletes minus (without deletion of non-removable prefix)
 * @example -$|42 => Backspace => $|42
 */
export function createLeadingMinusDeletionPreprocessor(
    params: Pick<
        Required<MaskitoNumberParams>,
        | 'decimalPseudoSeparators'
        | 'decimalSeparator'
        | 'maximumFractionDigits'
        | 'minusPseudoSigns'
        | 'minusSign'
        | 'negativePattern'
        | 'postfix'
        | 'prefix'
    >,
): MaskitoPreprocessor {
    return ({elementState}, inputType) => {
        const {value, selection} = elementState;
        const [from, to] = selection;
        const {prefix, minusSign, negativePattern} = params;
        const beginning = negativePattern === 'prefixFirst' ? prefix : minusSign + prefix;
        const newValue = fromNumberParts(
            {...toNumberParts(value, params), minus: ''},
            params,
        );
        const diff = value.length - newValue.length;

        return {
            elementState:
                inputType.includes('delete') &&
                value.includes(minusSign) &&
                from < beginning.length
                    ? {
                          value: newValue,
                          selection: [
                              Math.max(from - diff, beginning.length - 1),
                              Math.max(to - diff, beginning.length - 1),
                          ],
                      }
                    : elementState,
        };
    };
}
