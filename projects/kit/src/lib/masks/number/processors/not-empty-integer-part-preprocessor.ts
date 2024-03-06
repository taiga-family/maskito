import type {MaskitoPreprocessor} from '@maskito/core';

import {escapeRegExp, extractAffixes} from '../../../utils';

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
        const {cleanValue} = extractAffixes(value, {
            prefix,
            postfix,
        });
        const [from] = selection;

        if (
            precision <= 0 ||
            cleanValue.includes(decimalSeparator) ||
            !data.match(startWithDecimalSepRegExp)
        ) {
            return {elementState, data};
        }

        const digitsBeforeCursor = cleanValue.slice(0, from).match(/\d+/);

        return {
            elementState,
            data: digitsBeforeCursor ? data : `0${data}`,
        };
    };
}
