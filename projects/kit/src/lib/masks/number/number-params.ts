export interface MaskitoNumberParams
    extends Pick<
        Intl.NumberFormatOptions,
        'maximumFractionDigits' | 'minimumFractionDigits'
    > {
    min?: number;
    max?: number;
    decimalSeparator?: string;
    decimalPseudoSeparators?: readonly string[];
    thousandSeparator?: string;
    prefix?: string;
    postfix?: string;
    minusSign?: string;
    minusPseudoSigns?: readonly string[];
    negativePattern?: 'minusFirst' | 'prefixFirst';
}
