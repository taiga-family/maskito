import type {MaskitoPreprocessor} from '@maskito/core';

import {clamp, escapeRegExp, extractAffixes} from '../../../utils';

/**
 * It pads integer part with zero if user types decimal separator (for empty input).
 * @example Empty input => User types "," (decimal separator) => 0,|
 */
export function createNotEmptyIntegerPartPreprocessor({
    decimalSeparator,
    precision,
    prefix,
    postfix,
}: {
    decimalSeparator: string;
    precision: number;
    prefix: string;
    postfix: string;
}): MaskitoPreprocessor {
    const startWithDecimalSepRegExp = new RegExp(
        `^\\D*${escapeRegExp(decimalSeparator)}`,
    );

    return ({elementState, data}) => {
        const {value, selection} = elementState;
        const {cleanValue, extractedPrefix} = extractAffixes(value, {
            prefix,
            postfix,
        });
        const [from, to] = selection;
        const cleanFrom = clamp(from - extractedPrefix.length, 0, cleanValue.length);
        const cleanTo = clamp(to - extractedPrefix.length, 0, cleanValue.length);

        if (
            precision <= 0 ||
            cleanValue.slice(0, cleanFrom).includes(decimalSeparator) ||
            cleanValue.slice(cleanTo).includes(decimalSeparator) ||
            !data.match(startWithDecimalSepRegExp)
        ) {
            return {elementState, data};
        }

        const digitsBeforeCursor = cleanValue.slice(0, cleanFrom).match(/\d+/);

        return {
            elementState,
            data: digitsBeforeCursor ? data : `0${data}`,
        };
    };
}
