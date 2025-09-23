export interface MaskitoNumberParams
    extends Pick<
        Intl.NumberFormatOptions,
        'maximumFractionDigits' | 'minimumFractionDigits'
    > {
    min?: number;
    max?: number;
    /**
     * TODO(v4): delete
     * @deprecated use `maximumFractionDigits` instead
     */
    precision?: number;
    decimalSeparator?: string;
    decimalPseudoSeparators?: string[]; // TODO(v4): => readonly string[]
    /**
     * TODO(v4): delete
     * @deprecated use `minimumFractionDigits` instead
     */
    decimalZeroPadding?: boolean;
    thousandSeparator?: string;
    prefix?: string;
    postfix?: string;
    minusSign?: string;
    minusPseudoSigns?: readonly string[];
    negativePattern?: 'minusFirst' | 'prefixFirst';
}
