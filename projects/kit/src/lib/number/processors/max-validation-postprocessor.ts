import {MaskitoOptions} from '@maskito/core';

export function createMaxValidationPostprocessor({
    max,
    thousandSeparator,
    decimalSeparator,
}: {
    max: number;
    thousandSeparator: string;
    decimalSeparator: string;
}): NonNullable<MaskitoOptions['postprocessor']> {
    return ({value, selection}) => {
        const parsedValue = Number(
            value
                .replace(new RegExp(thousandSeparator, 'g'), '')
                .replace(decimalSeparator, '.'),
        );

        if (parsedValue > max) {
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
