import {MaskitoOptions} from '@maskito/core';

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
    return ({elementState, data}) => {
        const {value, selection} = elementState;
        const [from] = selection;

        if (
            precision <= 0 ||
            value.includes(decimalSeparator) ||
            !data.startsWith(decimalSeparator)
        ) {
            return {elementState, data};
        }

        return {
            elementState,
            data: value.slice(0, from) ? data : '0' + data,
        };
    };
}
