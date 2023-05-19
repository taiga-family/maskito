import {MaskitoPostprocessor} from '@maskito/core';

import {maskitoParseNumber} from '../utils';

export function createMaxValidationPostprocessor({
    max,
    decimalSeparator,
}: {
    max: number;
    decimalSeparator: string;
}): MaskitoPostprocessor {
    return ({value, selection}) => {
        if (maskitoParseNumber(value, decimalSeparator) > max) {
            const newValue = `${max}`.replace('.', decimalSeparator);

            return {
                value: newValue,
                selection: [newValue.length, newValue.length],
            };
        }

        return {
            value,
            selection,
        };
    };
}
