import type {MaskitoMask} from '@maskito/core';

import {escapeRegExp} from '../../../utils';

export function generateMaskExpression({
    decimalSeparator,
    isNegativeAllowed,
    maximumFractionDigits,
    thousandSeparator,
    prefix,
    postfix,
    decimalPseudoSeparators = [],
    pseudoMinuses = [],
    minusSign,
}: {
    decimalSeparator: string;
    isNegativeAllowed: boolean;
    maximumFractionDigits: number;
    thousandSeparator: string;
    prefix: string;
    postfix: string;
    decimalPseudoSeparators?: readonly string[];
    pseudoMinuses?: readonly string[];
    minusSign: string;
}): MaskitoMask {
    const computedPrefix = computeAllOptionalCharsRegExp(prefix);
    const digit = String.raw`\d`;
    const optionalMinus = isNegativeAllowed
        ? `[${minusSign}${pseudoMinuses.map((x) => `\\${x}`).join('')}]?`
        : '';
    const integerPart = thousandSeparator
        ? `[${digit}${escapeRegExp(thousandSeparator).replaceAll(/\s/g, String.raw`\s`)}]*`
        : `[${digit}]*`;
    const precisionPart = Number.isFinite(maximumFractionDigits)
        ? maximumFractionDigits
        : '';
    const decimalPart =
        maximumFractionDigits > 0
            ? `([${escapeRegExp(decimalSeparator)}${decimalPseudoSeparators
                  .map(escapeRegExp)
                  .join('')}]${digit}{0,${precisionPart}})?`
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
              .map((char) => `${escapeRegExp(char)}?`)
              .join('')}`
        : '';
}
