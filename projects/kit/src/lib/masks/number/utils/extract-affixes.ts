import {escapeRegExp} from '../../../utils/escape-reg-exp';
import type {MaskitoNumberParams} from '../number-params';

export function extractAffixes(
    value: string,
    {
        prefix,
        postfix,
        decimalSeparator,
        decimalPseudoSeparators,
        minusSign,
        minusPseudoSigns,
        maximumFractionDigits,
    }: Pick<
        Required<MaskitoNumberParams>,
        | 'decimalPseudoSeparators'
        | 'decimalSeparator'
        | 'maximumFractionDigits'
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
        new RegExp(`^([${minuses}])?(${prefix.split('').map(escapeRegExp).join('?')}?)`);
    const postfixRegExp =
        postfix && new RegExp(`${postfix.split('').map(escapeRegExp).join('?')}?$`);

    const [, , extractedPrefix = ''] = value.match(prefixRegExp) ?? [];
    const [extractedPostfix = ''] = value.match(postfixRegExp) ?? [];

    const cleanValue = value
        .replace(prefixRegExp, prefix && '$1')
        .replace(postfixRegExp, '');

    const leadingDecimalSeparatorRE = new RegExp(
        decimalSeparator && maximumFractionDigits > 0 ? `^[${decimalSeparators}]` : '',
    );
    const leadingDigitsRE = new RegExp(value.endsWith(postfix) ? '' : String.raw`^\d+`);
    const trailingDecimalSeparatorRE = new RegExp(
        decimalSeparator && maximumFractionDigits > 0 ? `[${decimalSeparators}]$` : '',
    );
    const trailingDigitsRE = new RegExp(value.startsWith(prefix) ? '' : String.raw`\d+$`);

    return {
        extractedPrefix: extractedPrefix
            .replace(trailingDecimalSeparatorRE, '')
            .replace(trailingDigitsRE, ''),
        extractedPostfix: extractedPostfix
            .replace(leadingDecimalSeparatorRE, '')
            .replace(leadingDigitsRE, ''),
        cleanValue:
            (trailingDigitsRE.exec(extractedPrefix)?.[0] ?? '') +
            (trailingDecimalSeparatorRE.exec(extractedPrefix)?.[0] ?? '') +
            cleanValue +
            (leadingDigitsRE.exec(extractedPostfix)?.[0] ?? '') +
            (leadingDecimalSeparatorRE.exec(extractedPostfix)?.[0] ?? ''),
    };
}
