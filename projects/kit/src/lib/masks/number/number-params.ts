export interface MaskitoNumberParams extends Pick<
    Intl.NumberFormatOptions,
    'maximumFractionDigits' | 'minimumFractionDigits'
> {
    min?: bigint | number;
    max?: bigint | number;
    locale?: string;
    decimalSeparator?: string;
    decimalPseudoSeparators?: readonly string[];
    thousandSeparator?: string;
    thousandSeparatorPattern?: (digits: string) => readonly string[];
    prefix?: string;
    postfix?: string;
    minusSign?: string;
    minusPseudoSigns?: readonly string[];
    negativePattern?: 'minusFirst' | 'prefixFirst';
}
