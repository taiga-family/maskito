import {
    CHAR_MINUS,
    CHAR_NO_BREAK_SPACE,
    CHAR_ZERO_WIDTH_SPACE,
    DEFAULT_PSEUDO_MINUSES,
} from '../../../constants';
import {type MaskitoNumberParams} from '../number-params';
import {validateDecimalPseudoSeparators} from './validate-decimal-pseudo-separators';

export function withNumberDefaults({
    max = Infinity,
    min = -Infinity,
    thousandSeparator = CHAR_NO_BREAK_SPACE,
    thousandSeparatorPattern = (x) => x.match(/\d{1,3}(?=(?:\d{3})*$)/g) ?? [],
    decimalSeparator = '.',
    decimalPseudoSeparators: unsafeDecimalPseudoSeparators,
    prefix = '',
    postfix = '',
    minusSign = CHAR_MINUS,
    minusPseudoSigns = DEFAULT_PSEUDO_MINUSES.filter(
        (char) =>
            char !== thousandSeparator && char !== decimalSeparator && char !== minusSign,
    ),
    maximumFractionDigits = 0,
    minimumFractionDigits = 0,
    negativePattern = 'prefixFirst',
}: MaskitoNumberParams = {}): Required<MaskitoNumberParams> {
    const decimalPseudoSeparators = validateDecimalPseudoSeparators({
        decimalSeparator,
        thousandSeparator,
        decimalPseudoSeparators: unsafeDecimalPseudoSeparators,
    });

    return {
        max,
        min,
        thousandSeparator,
        thousandSeparatorPattern,
        postfix,
        minusSign,
        minusPseudoSigns,
        maximumFractionDigits,
        decimalPseudoSeparators,
        negativePattern,
        decimalSeparator:
            maximumFractionDigits <= 0 && decimalSeparator === thousandSeparator
                ? ''
                : decimalSeparator,
        prefix:
            prefix.endsWith(decimalSeparator) && maximumFractionDigits > 0
                ? `${prefix}${CHAR_ZERO_WIDTH_SPACE}`
                : prefix,
        minimumFractionDigits: Math.min(minimumFractionDigits, maximumFractionDigits),
    };
}
