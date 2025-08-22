import {escapeRegExp} from '../../../utils/escape-reg-exp';
import type {MaskitoNumberParams} from '../number-params';
import {extractPrefixInfo} from './extract-prefix-info';

export function extractAffixes(
    value: string,
    {
        prefix,
        postfix,
        decimalSeparator,
        decimalPseudoSeparators,
        minusSign,
        minusPseudoSigns,
    }: Pick<
        Required<MaskitoNumberParams>,
        | 'decimalPseudoSeparators'
        | 'decimalSeparator'
        | 'minusPseudoSigns'
        | 'minusSign'
        | 'postfix'
        | 'prefix'
    >,
): {
    extractedPrefix: string;
    extractedPostfix: string;
    cleanValue: string;
} {
    const decimalSeparators = [...decimalPseudoSeparators, decimalSeparator]
        .map((x) => `\\${x}`)
        .join('');
    const minuses = [...minusPseudoSigns, minusSign].map((x) => `\\${x}`).join('');
    const prefixRegExp =
        prefix &&
        new RegExp(
            `^([${minuses}])?(${extractPrefixInfo({prefix, minusSign}).prefix.split('').map(escapeRegExp).join('?')}?)`,
        );
    const postfixRegExp =
        postfix && new RegExp(`${postfix.split('').map(escapeRegExp).join('?')}?$`);

    const [, , extractedPrefix = ''] = value.match(prefixRegExp) ?? [];
    const [extractedPostfix = ''] = value.match(postfixRegExp) ?? [];

    const cleanValue = value
        .replace(prefixRegExp, prefix && '$1')
        .replace(postfixRegExp, '');

    const leadingDecimalSeparatorRE = new RegExp(
        decimalSeparator && `^[${decimalSeparators}]`,
    );
    const trailingDecimalSeparatorRE = new RegExp(
        decimalSeparator && `[${decimalSeparators}]$`,
    );

    return {
        extractedPrefix: extractedPrefix.replace(trailingDecimalSeparatorRE, ''),
        extractedPostfix: extractedPostfix.replace(leadingDecimalSeparatorRE, ''),
        cleanValue:
            (trailingDecimalSeparatorRE.exec(extractedPrefix)?.[0] ?? '') +
            cleanValue +
            (leadingDecimalSeparatorRE.exec(extractedPostfix)?.[0] ?? ''),
    };
}
