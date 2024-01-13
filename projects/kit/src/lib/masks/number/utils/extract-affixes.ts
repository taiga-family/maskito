import {escapeRegExp} from '../../../utils';

export function extractAffixes(
    value: string,
    {prefix, postfix}: {prefix: string; postfix: string},
): {
    extractedPrefix: string;
    extractedPostfix: string;
    cleanValue: string;
} {
    const prefixRegExp = new RegExp(`^${escapeRegExp(prefix)}`);
    const postfixRegExp = new RegExp(`${escapeRegExp(postfix)}$`);

    const [extractedPrefix = ''] = value.match(prefixRegExp) ?? [];
    const [extractedPostfix = ''] = value.match(postfixRegExp) ?? [];

    const cleanValue = value.replace(prefixRegExp, '').replace(postfixRegExp, '');

    return {extractedPrefix, extractedPostfix, cleanValue};
}
