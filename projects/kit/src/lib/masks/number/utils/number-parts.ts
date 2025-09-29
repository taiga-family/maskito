import {escapeRegExp} from '../../../utils';
import type {MaskitoNumberParams} from '../number-params';
import {extractAffixes} from './extract-affixes';

interface NumberParts {
    prefix: string;
    minus: string;
    integerPart: string;
    decimalPart: string;
    decimalSeparator: string;
    postfix: string;
}

export function toNumberParts(
    value: string,
    params: Pick<
        Required<MaskitoNumberParams>,
        | 'decimalPseudoSeparators'
        | 'decimalSeparator'
        | 'maximumFractionDigits'
        | 'minusPseudoSigns'
        | 'minusSign'
        | 'postfix'
        | 'prefix'
    >,
): NumberParts {
    const {extractedPrefix, cleanValue, extractedPostfix} = extractAffixes(value, params);
    const {
        decimalSeparator,
        minusSign,
        minusPseudoSigns,
        decimalPseudoSeparators,
        maximumFractionDigits,
    } = params;
    const [integerWithMinus = '', decimalPart = ''] = decimalSeparator
        ? cleanValue.split(decimalSeparator)
        : [cleanValue];
    const minuses = [minusSign, ...minusPseudoSigns].map((x) => `\\${x}`).join('');
    const [, minus = '', integerPart = ''] =
        new RegExp(`^([${minuses}])?(.*)`).exec(integerWithMinus) || [];

    return {
        prefix: extractedPrefix,
        minus,
        integerPart,
        decimalPart,
        decimalSeparator:
            decimalSeparator && maximumFractionDigits > 0
                ? (new RegExp(
                      `[${[decimalSeparator, ...decimalPseudoSeparators].map(escapeRegExp).join('')}]`,
                      'i',
                  ).exec(cleanValue)?.[0] ?? '')
                : '',
        postfix: extractedPostfix,
    };
}

export function fromNumberParts(
    {
        minus = '',
        integerPart = '',
        decimalPart = '',
        prefix = '',
        postfix = '',
        decimalSeparator = '',
    }: Partial<NumberParts>,
    params: Pick<
        Required<MaskitoNumberParams>,
        'decimalSeparator' | 'minusSign' | 'negativePattern' | 'prefix'
    >,
): string {
    const separator = decimalPart ? params.decimalSeparator : decimalSeparator;
    const beginning =
        params.negativePattern === 'minusFirst' ? minus + prefix : prefix + minus;

    return `${beginning}${integerPart}${separator}${decimalPart}${postfix}`;
}
