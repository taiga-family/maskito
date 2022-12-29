import {MaskitoOptions} from '@maskito/core';

export function generateMaskExpression({
    decimalSeparator,
    isNegativeAllowed,
    precision,
    thousandSeparator,
}: {
    decimalSeparator: string;
    isNegativeAllowed: boolean;
    precision: number;
    thousandSeparator: string;
}): MaskitoOptions['mask'] {
    const digit = '\\d';
    const optionalMinus = isNegativeAllowed ? '-?' : '';
    const integerPart = `[${digit}${thousandSeparator}]*`;
    const decimalPart = `(${decimalSeparator}${digit}{0,${precision}})?`;

    return precision > 0
        ? new RegExp(`^${optionalMinus}${integerPart}${decimalPart}$`)
        : new RegExp(`^${optionalMinus}${integerPart}$`);
}
