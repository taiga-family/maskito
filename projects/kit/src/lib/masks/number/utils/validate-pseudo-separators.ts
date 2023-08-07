import {DEFAULT_PSEUDO_SEPARATORS} from '../../../constants';

export function validatePseudoSeparators({
    decimalSeparator,
    thousandSeparator,
    decimalPseudoSeparators = DEFAULT_PSEUDO_SEPARATORS,
}: {
    decimalSeparator: string;
    thousandSeparator: string;
    decimalPseudoSeparators?: string[];
}): string[] {
    return (
        decimalPseudoSeparators.filter(
            char => char !== thousandSeparator && char !== decimalSeparator,
        ) ?? []
    );
}
