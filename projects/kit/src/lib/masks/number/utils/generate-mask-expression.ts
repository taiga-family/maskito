import type {MaskitoMask} from '@maskito/core';

import {escapeRegExp} from '../../../utils';
import type {MaskitoNumberParams} from '../number-params';

export function generateMaskExpression({
    decimalPseudoSeparators,
    decimalSeparator,
    maximumFractionDigits,
    min,
    minusSign,
    postfix,
    prefix,
    pseudoMinuses,
    thousandSeparator,
}: Pick<
    Required<MaskitoNumberParams>,
    | 'decimalPseudoSeparators'
    | 'decimalSeparator'
    | 'maximumFractionDigits'
    | 'min'
    | 'minusSign'
    | 'postfix'
    | 'prefix'
    | 'thousandSeparator'
> & {pseudoMinuses: readonly string[]}): MaskitoMask {
    const computedPrefix =
        min < 0 && [minusSign, ...pseudoMinuses].includes(prefix)
            ? ''
            : computeAllOptionalCharsRegExp(prefix);
    const digit = String.raw`\d`;
    const optionalMinus =
        min < 0 ? `[${minusSign}${pseudoMinuses.map((x) => `\\${x}`).join('')}]?` : '';
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
