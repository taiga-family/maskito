import {escapeRegExp} from './escape-reg-exp';

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

    if (extractedPrefix || extractedPostfix) {
        return {
            extractedPrefix,
            extractedPostfix,
            cleanValue: value.slice(
                extractedPrefix.length,
                extractedPostfix.length ? -extractedPostfix.length : Infinity,
            ),
        };
    }

    return {extractedPrefix, extractedPostfix, cleanValue: value};
}
