export interface MaskitoNumberParams {
    min?: number;
    max?: number;
    precision?: number;
    decimalSeparator?: string;
    decimalPseudoSeparators?: string[]; // TODO v4: => readonly string[]
    decimalZeroPadding?: boolean;
    thousandSeparator?: string;
    prefix?: string;
    postfix?: string;
    minusSign?: string;
}
