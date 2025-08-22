import type {MaskitoMask} from '@maskito/core';

import {escapeRegExp} from '../../../utils';
import type {MaskitoNumberParams} from '../number-params';
import {extractPrefixInfo} from './extract-prefix-info';

export function generateMaskExpression({
    decimalPseudoSeparators,
    decimalSeparator,
    maximumFractionDigits,
    min,
    minusSign,
    minusPseudoSigns,
    postfix,
    thousandSeparator,
    ...params
}: Pick<
    Required<MaskitoNumberParams>,
    | 'decimalPseudoSeparators'
    | 'decimalSeparator'
    | 'maximumFractionDigits'
    | 'min'
    | 'minusPseudoSigns'
    | 'minusSign'
    | 'postfix'
    | 'prefix'
    | 'thousandSeparator'
>): MaskitoMask {
    const {prefix} = extractPrefixInfo({...params, minusSign});
    const computedPrefix =
        min < 0 && [minusSign, ...minusPseudoSigns].includes(prefix)
            ? ''
            : computeAllOptionalCharsRegExp(prefix);
    const digit = String.raw`\d`;
    const optionalMinus =
        min < 0 ? `[${minusSign}${minusPseudoSigns.map((x) => `\\${x}`).join('')}]?` : '';
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
    const beginning = `(${optionalMinus + computedPrefix}|${computedPrefix + optionalMinus})`;

    return new RegExp(`^${beginning}${integerPart}${decimalPart}${computedPostfix}$`);
}

function computeAllOptionalCharsRegExp(str: string): string {
    return str
        ? `${str
              .split('')
              .map((char) => `${escapeRegExp(char)}?`)
              .join('')}`
        : '';
}
