import {CHAR_MINUS} from '../../../constants';
import {escapeRegExp} from '../../../utils';

export function extractPrefixAndPostfix({
    value,
    prefix,
    postfix,
    shouldExtractMinus = false,
}: {
    value: string;
    prefix: string;
    postfix: string;
    shouldExtractMinus?: boolean;
}): {
    extractedPrefix: string;
    extractedPostfix: string;
    cleanValue: string;
} {
    const minusPart = shouldExtractMinus ? `${CHAR_MINUS}?` : '';
    const prefixRegExp = new RegExp(`^${escapeRegExp(prefix)}${minusPart}`);
    const postfixRegExp = new RegExp(`${escapeRegExp(postfix)}$`);

    const [extractedPrefix = ''] = value.match(prefixRegExp) ?? [];
    const [extractedPostfix = ''] = value.match(postfixRegExp) ?? [];

    const cleanValue = value.replace(prefixRegExp, '').replace(postfixRegExp, '');

    return {extractedPrefix, extractedPostfix, cleanValue};
}
