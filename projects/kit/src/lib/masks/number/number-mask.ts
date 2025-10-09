import type {MaskitoOptions} from '@maskito/core';
import {MASKITO_DEFAULT_OPTIONS} from '@maskito/core';

import {
    CHAR_MINUS,
    CHAR_NO_BREAK_SPACE,
    CHAR_ZERO_WIDTH_SPACE,
    DEFAULT_PSEUDO_MINUSES,
} from '../../constants';
import {
    createFullWidthToHalfWidthPreprocessor,
    maskitoPostfixPostprocessorGenerator,
} from '../../processors';
import type {MaskitoNumberParams} from './number-params';
import {
    createLeadingZeroesValidationPlugin,
    createMinMaxPlugin,
    createNotEmptyIntegerPlugin,
} from './plugins';
import {
    createAffixesFilterPreprocessor,
    createDecimalZeroPaddingPostprocessor,
    createInitializationOnlyPreprocessor,
    createLeadingMinusDeletionPreprocessor,
    createMinMaxPostprocessor,
    createNonRemovableCharsDeletionPreprocessor,
    createNotEmptyIntegerPartPreprocessor,
    createNumberPrefixPostprocessor,
    createPseudoCharactersPreprocessor,
    createRepeatedDecimalSeparatorPreprocessor,
    createThousandSeparatorPostprocessor,
    createZeroPrecisionPreprocessor,
    emptyPostprocessor,
} from './processors';
import {generateMaskExpression, validateDecimalPseudoSeparators} from './utils';

export function maskitoNumberOptionsGenerator({
    max = Number.MAX_SAFE_INTEGER,
    min = Number.MIN_SAFE_INTEGER,
    thousandSeparator = CHAR_NO_BREAK_SPACE,
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
}: MaskitoNumberParams = {}): Required<MaskitoOptions> {
    const decimalPseudoSeparators = validateDecimalPseudoSeparators({
        decimalSeparator,
        thousandSeparator,
        decimalPseudoSeparators: unsafeDecimalPseudoSeparators,
    });

    const params: Required<MaskitoNumberParams> = {
        max,
        min,
        thousandSeparator,
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

    return {
        ...MASKITO_DEFAULT_OPTIONS,
        mask: generateMaskExpression(params),
        preprocessors: [
            createFullWidthToHalfWidthPreprocessor(),
            createInitializationOnlyPreprocessor(params),
            createAffixesFilterPreprocessor(params),
            createPseudoCharactersPreprocessor({
                ...params,
                validCharacter: minusSign,
                pseudoCharacters: minusPseudoSigns,
            }),
            createPseudoCharactersPreprocessor({
                ...params,
                validCharacter: decimalSeparator,
                pseudoCharacters: decimalPseudoSeparators,
            }),
            createNotEmptyIntegerPartPreprocessor(params),
            createNonRemovableCharsDeletionPreprocessor(params),
            createZeroPrecisionPreprocessor(params),
            createRepeatedDecimalSeparatorPreprocessor(params),
            createLeadingMinusDeletionPreprocessor(params),
        ],
        postprocessors: [
            createMinMaxPostprocessor(params),
            createNumberPrefixPostprocessor(params),
            maskitoPostfixPostprocessorGenerator(postfix),
            createThousandSeparatorPostprocessor(params),
            createDecimalZeroPaddingPostprocessor(params),
            emptyPostprocessor(params),
        ],
        plugins: [
            createLeadingZeroesValidationPlugin(params),
            createNotEmptyIntegerPlugin(params),
            createMinMaxPlugin(params),
        ],
        overwriteMode:
            minimumFractionDigits > 0
                ? ({value, selection: [from]}) =>
                      from <= value.indexOf(decimalSeparator) ? 'shift' : 'replace'
                : 'shift',
    };
}
