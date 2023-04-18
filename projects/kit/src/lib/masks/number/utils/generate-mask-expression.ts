import {MaskitoOptions} from '@maskito/core';

import {CHAR_MINUS} from '../../../constants';

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
    const optionalMinus = isNegativeAllowed ? `\\${CHAR_MINUS}?` : '';
    const integerPart = thousandSeparator
        ? `[${digit}\\${thousandSeparator}]*`
        : `[${digit}]*`;
    const decimalPart = `(\\${decimalSeparator}${digit}{0,${
        Number.isFinite(precision) ? precision : ''
    }})?`;

    return precision > 0
        ? new RegExp(`^${optionalMinus}${integerPart}${decimalPart}$`)
        : new RegExp(`^${optionalMinus}${integerPart}$`);
}
