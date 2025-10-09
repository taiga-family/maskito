import {DEFAULT_DECIMAL_PSEUDO_SEPARATORS} from '../../../constants';

export function validateDecimalPseudoSeparators({
    decimalSeparator,
    thousandSeparator,
    decimalPseudoSeparators = DEFAULT_DECIMAL_PSEUDO_SEPARATORS,
}: {
    decimalSeparator: string;
    thousandSeparator: string;
    decimalPseudoSeparators?: readonly string[];
}): string[] {
    return decimalPseudoSeparators.filter(
        (char) => char !== thousandSeparator && char !== decimalSeparator,
    );
}
