import {MaskitoOptions} from '@maskito/core';

import {escapeRegExp} from '../../../utils';

/**
 * It pads integer part with zero if user types decimal separator (for empty input).
 * @example Empty input => User types "," (decimal separator) => 0,|
 */
export function createNotEmptyIntegerPartPreprocessor({
    decimalSeparator,
    precision,
}: {
    decimalSeparator: string;
    precision: number;
}): NonNullable<MaskitoOptions['preprocessor']> {
    const startWithDecimalSepRegExp = new RegExp(
        `^\\D*${escapeRegExp(decimalSeparator)}`,
    );

    return ({elementState, data}) => {
        const {value, selection} = elementState;
        const [from] = selection;

        if (
            precision <= 0 ||
            value.includes(decimalSeparator) ||
            !data.match(startWithDecimalSepRegExp)
        ) {
            return {elementState, data};
        }

        const digitsBeforeCursor = value.slice(0, from).match(/\d+/);

        return {
            elementState,
            data: digitsBeforeCursor ? data : `0${data}`,
        };
    };
}
