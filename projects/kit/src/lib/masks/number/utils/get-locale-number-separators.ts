import {DEFAULT_THOUSAND_SEPARATOR_PATTERN} from './default-thousand-separator-pattern';

interface LocaleNumberSeparators {
    thousandSeparator: string;
    decimalSeparator: string;
    thousandSeparatorPattern: (digits: string) => readonly string[];
}

export function getLocaleNumberSeparators(locale: string): LocaleNumberSeparators {
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
