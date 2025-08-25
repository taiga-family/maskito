import {CHAR_ZERO_WIDTH_SPACE} from '../../../constants';
import type {MaskitoNumberParams} from '../number-params';

export function validatePrefix(
    prefix: string | readonly [string, string],
    {
        decimalSeparator,
        maximumFractionDigits,
    }: Pick<Required<MaskitoNumberParams>, 'decimalSeparator' | 'maximumFractionDigits'>,
): string | readonly [string, string] {
    const validate = (prefix: string): string =>
        prefix.endsWith(decimalSeparator) && maximumFractionDigits > 0
            ? `${prefix}${CHAR_ZERO_WIDTH_SPACE}`
            : prefix;

    return typeof prefix === 'string'
        ? validate(prefix)
        : (prefix.map(validate) as unknown as readonly [string, string]);
}
