import {escapeRegExp} from '../../../utils/escape-reg-exp';
import type {MaskitoNumberParams} from '../number-params';

export function extractAffixes(
    value: string,
    {
        prefix,
        postfix,
        decimalSeparator,
        decimalPseudoSeparators,
    }: Pick<
        Required<MaskitoNumberParams>,
        'decimalPseudoSeparators' | 'decimalSeparator' | 'postfix' | 'prefix'
    >,
): {
    extractedPrefix: string;
    extractedPostfix: string;
    cleanValue: string;
} {
    const decimalSeparators = [...decimalPseudoSeparators, decimalSeparator]
        .map((x) => `\\${x}`)
        .join('');
    const prefixRegExp =
        prefix && new RegExp(`^${prefix.split('').map(escapeRegExp).join('?')}?`);
    const postfixRegExp =
        postfix && new RegExp(`${postfix.split('').map(escapeRegExp).join('?')}?$`);

    const [extractedPrefix = ''] = value.match(prefixRegExp) ?? [];
    const [extractedPostfix = ''] = value.match(postfixRegExp) ?? [];

    const cleanValue =
        extractedPrefix || extractedPostfix
            ? value.slice(
                  extractedPrefix.length,
                  extractedPostfix.length ? -extractedPostfix.length : Infinity,
              )
            : value;

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
