import type {MaskitoNumberParams} from '@maskito/kit';

export function extractPrefixInfo({
    prefix,
    minusSign,
}: Pick<Required<MaskitoNumberParams>, 'minusSign' | 'prefix'>): {
    prefix: string;
    prefixIndex: number;
} {
    const prefixIndex = Array.isArray(prefix)
        ? prefix.findIndex((x) => x !== minusSign)
        : 0;

    return {
        prefix: Array.isArray(prefix) ? prefix[prefixIndex] : prefix,
        prefixIndex,
    };
}
