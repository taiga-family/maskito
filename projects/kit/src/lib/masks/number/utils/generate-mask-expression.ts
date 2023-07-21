import {MaskitoMask} from '@maskito/core';

import {CHAR_MINUS} from '../../../constants';
import {escapeRegExp} from '../../../utils';

export function generateMaskExpression({
    decimalSeparator,
    decimalPseudoSeparators = [],
    isNegativeAllowed = true,
    precision = Infinity,
    thousandSeparator = '',
    prefix = '',
    postfix = '',
    pseudoMinuses = [],
}: {
    decimalSeparator: string;
    decimalPseudoSeparators?: readonly string[];
    isNegativeAllowed?: boolean;
    precision?: number;
    thousandSeparator?: string;
    prefix?: string;
    postfix?: string;
    pseudoMinuses?: readonly string[];
}): MaskitoMask {
    const computedPrefix = computeAllOptionalCharsRegExp(prefix);
    const digit = '\\d';
    const optionalMinus = isNegativeAllowed
        ? `[${CHAR_MINUS}${pseudoMinuses.map(x => `\\${x}`).join('')}]?`
        : '';
    const integerPart = thousandSeparator
        ? `[${digit}${escapeRegExp(thousandSeparator)}]*`
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
