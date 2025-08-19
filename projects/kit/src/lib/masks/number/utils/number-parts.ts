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
    {
        decimalSeparator,
        decimalPseudoSeparators,
        minusSign,
        minusPseudoSigns,
        prefix,
        postfix,
    }: Pick<
        Required<MaskitoNumberParams>,
        | 'decimalPseudoSeparators'
        | 'decimalSeparator'
        | 'minusPseudoSigns'
        | 'minusSign'
        | 'postfix'
        | 'prefix'
    >,
): NumberParts {
    const {extractedPrefix, cleanValue, extractedPostfix} = extractAffixes(value, {
        prefix,
        postfix,
        decimalSeparator,
        decimalPseudoSeparators,
    });
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
        decimalSeparator: decimalSeparator
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
    params: Pick<Required<MaskitoNumberParams>, 'decimalSeparator'>,
): string {
    const separator = decimalPart ? params.decimalSeparator : decimalSeparator;

    return `${prefix}${minus}${integerPart}${separator}${decimalPart}${postfix}`;
}
