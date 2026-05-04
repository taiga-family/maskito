import type {MaskitoNumberParams} from '../number-params';
import {DEFAULT_THOUSAND_SEPARATOR_PATTERN} from './default-thousand-separator-pattern';

export function getLocaleNumberParams(
    locale: string,
): Pick<
    Required<MaskitoNumberParams>,
    'decimalSeparator' | 'thousandSeparator' | 'thousandSeparatorPattern'
> {
    const separatorParts = new Intl.NumberFormat(locale, {
        minimumFractionDigits: 1,
        useGrouping: true,
    }).formatToParts(1234.5);

    const thousandSeparator =
        separatorParts.find((part) => part.type === 'group')?.value ?? '';

    const decimalSeparator =
        separatorParts.find((part) => part.type === 'decimal')?.value ?? '.';

    if (!thousandSeparator) {
        return {
            thousandSeparator,
            decimalSeparator,
            thousandSeparatorPattern: DEFAULT_THOUSAND_SEPARATOR_PATTERN,
        };
    }

    const groupingFormatter = new Intl.NumberFormat(locale, {maximumFractionDigits: 0});

    return {
        thousandSeparator,
        decimalSeparator,
        thousandSeparatorPattern: (digits: string): readonly string[] => {
            if (!digits) {
                return [];
            }

            let pos = 0;

            return groupingFormatter
                .formatToParts(BigInt(`1${'0'.repeat(digits.length - 1)}`))
                .filter((part) => part.type === 'integer')
                .map((part) => {
                    const group = digits.slice(pos, pos + part.value.length);

                    pos += part.value.length;

                    return group;
                });
        },
    };
}
