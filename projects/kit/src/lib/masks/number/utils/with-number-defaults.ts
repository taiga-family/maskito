import {
    CHAR_MINUS,
    CHAR_NO_BREAK_SPACE,
    CHAR_ZERO_WIDTH_SPACE,
    DEFAULT_PSEUDO_MINUSES,
} from '../../../constants';
import {type MaskitoNumberParams} from '../number-params';
import {DEFAULT_THOUSAND_SEPARATOR_PATTERN} from './default-thousand-separator-pattern';
import {getLocaleNumberSeparators} from './get-locale-number-separators';
import {validateDecimalPseudoSeparators} from './validate-decimal-pseudo-separators';

export function withNumberDefaults({
    locale = '',
    ...params
}: MaskitoNumberParams = {}): Required<MaskitoNumberParams> {
    const {
        max = Infinity,
        min = -Infinity,
        thousandSeparator = CHAR_NO_BREAK_SPACE,
        thousandSeparatorPattern = DEFAULT_THOUSAND_SEPARATOR_PATTERN,
        decimalSeparator = '.',
        decimalPseudoSeparators: unsafeDecimalPseudoSeparators,
        prefix = '',
        postfix = '',
        minusSign = CHAR_MINUS,
        minusPseudoSigns = DEFAULT_PSEUDO_MINUSES.filter(
            (char) =>
                char !== thousandSeparator &&
                char !== decimalSeparator &&
                char !== minusSign,
        ),
        maximumFractionDigits = 0,
        minimumFractionDigits = 0,
        negativePattern = 'prefixFirst',
    } = locale ? {...getLocaleNumberSeparators(locale), ...params} : params;

    const decimalPseudoSeparators = validateDecimalPseudoSeparators({
        decimalSeparator,
        thousandSeparator,
        decimalPseudoSeparators: unsafeDecimalPseudoSeparators,
    });

    return {
        max,
        min,
        locale,
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
