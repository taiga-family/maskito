import type {MaskitoMask} from '@maskito/core';

import {CHAR_MINUS} from '../../../constants';
import {escapeRegExp} from '../../../utils';

export function generateMaskExpression({
    decimalSeparator,
    isNegativeAllowed,
    precision,
    thousandSeparator,
    prefix,
    postfix,
    decimalPseudoSeparators = [],
    pseudoMinuses = [],
}: {
    decimalSeparator: string;
    isNegativeAllowed: boolean;
    precision: number;
    thousandSeparator: string;
    prefix: string;
    postfix: string;
    decimalPseudoSeparators?: readonly string[];
    pseudoMinuses?: readonly string[];
}): MaskitoMask {
    const computedPrefix = computeAllOptionalCharsRegExp(prefix);
    const digit = '\\d';
    const optionalMinus = isNegativeAllowed
        ? `[${CHAR_MINUS}${pseudoMinuses.map(x => `\\${x}`).join('')}]?`
        : '';
    const integerPart = thousandSeparator
        ? `[${digit}${escapeRegExp(thousandSeparator).replaceAll(/\s/g, '\\s')}]*`
        : `[${digit}]*`;
    const decimalPart =
        precision > 0
            ? `([${escapeRegExp(decimalSeparator)}${decimalPseudoSeparators
                  .map(escapeRegExp)
                  .join('')}]${digit}{0,${Number.isFinite(precision) ? precision : ''}})?`
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
