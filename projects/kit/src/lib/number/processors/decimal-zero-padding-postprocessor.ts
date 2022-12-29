import {MaskitoOptions} from '@maskito/core';

/**
 * If `decimalZeroPadding` is `true`, it pads decimal part with zeroes
 * (until number of digits after decimalSeparator is equal to the `precision`).
 * @example 1,42 => (`precision` is equal to 4) => 1,4200.
 */
export function createDecimalZeroPaddingPostprocessor({
    decimalSeparator,
    precision,
    decimalZeroPadding,
}: {
    decimalSeparator: string;
    decimalZeroPadding: boolean;
    precision: number;
}): NonNullable<MaskitoOptions['postprocessor']> {
    if (precision <= 0 || !decimalZeroPadding) {
        return elementState => elementState;
    }

    return ({value, selection}) => {
        const [integerPart, decimalPart = ''] = value.split(decimalSeparator);

        if (!integerPart) {
            return {value, selection};
        }

        return {
            value: integerPart + decimalSeparator + decimalPart.padEnd(precision, '0'),
            selection,
        };
    };
}
