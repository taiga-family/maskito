import {MaskitoOptions} from '@maskito/core';

import {CHAR_MINUS} from '../../../constants';
import {escapeRegExp} from '../../../utils';

export function generateMaskExpression({
    decimalSeparator,
    isNegativeAllowed,
    precision,
    thousandSeparator,
    prefix,
    postfix,
}: {
    decimalSeparator: string;
    isNegativeAllowed: boolean;
    precision: number;
    thousandSeparator: string;
    prefix: string;
    postfix: string;
}): MaskitoOptions['mask'] {
    const computedPrefix = computeAllOptionalCharsRegExp(prefix);
    const digit = '\\d';
    const optionalMinus = isNegativeAllowed ? `${CHAR_MINUS}?` : '';
    const integerPart = thousandSeparator
        ? `[${digit}${escapeRegExp(thousandSeparator)}]*`
        : `[${digit}]*`;
    const decimalPart =
        precision > 0
            ? `(${escapeRegExp(decimalSeparator)}${digit}{0,${
                  Number.isFinite(precision) ? precision : ''
              }})?`
            : '';
    const computedPostfix = computeAllOptionalCharsRegExp(postfix);

    return new RegExp(
        `^${computedPrefix}${optionalMinus}${integerPart}${decimalPart}${computedPostfix}$`,
    );
}

function computeAllOptionalCharsRegExp(str: string): string {
    return str
        ? `${str
              .split('')
              .map(char => `${escapeRegExp(char)}?`)
              .join('')}`
        : '';
}
