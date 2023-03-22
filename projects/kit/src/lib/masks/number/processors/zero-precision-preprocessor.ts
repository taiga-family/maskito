import {MaskitoOptions} from '@maskito/core';

/**
 * It drops decimal part if precision is zero.
 * @example User pastes '123.45' (but precision is zero) => 123
 */
export function createZeroPrecisionPreprocessor(
    precision: number,
    decimalSeparator: string,
): NonNullable<MaskitoOptions['preprocessor']> {
    if (precision > 0) {
        return elementState => elementState;
    }

    const decimalPartRegExp = new RegExp(`\\${decimalSeparator}.*$`, 'g');

    return ({elementState, data}) => {
        const {value, selection} = elementState;
        const [from, to] = selection;
        const newValue = value.replace(decimalPartRegExp, '');

        return {
            elementState: {
                selection: [
                    Math.min(from, newValue.length),
                    Math.min(to, newValue.length),
                ],
                value: newValue,
            },
            data: data.replace(decimalPartRegExp, ''),
        };
    };
}
