import type {MaskitoOptions} from '@maskito/core';
import {MASKITO_DEFAULT_OPTIONS} from '@maskito/core';

import {
    CHAR_EM_DASH,
    CHAR_EN_DASH,
    CHAR_HYPHEN,
    CHAR_JP_HYPHEN,
    CHAR_MINUS,
    CHAR_NO_BREAK_SPACE,
    CHAR_ZERO_WIDTH_SPACE,
} from '../../constants';
import {
    createFullWidthToHalfWidthPreprocessor,
    maskitoPostfixPostprocessorGenerator,
    maskitoPrefixPostprocessorGenerator,
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
    createMinMaxPostprocessor,
    createNonRemovableCharsDeletionPreprocessor,
    createNotEmptyIntegerPartPreprocessor,
    createPseudoCharactersPreprocessor,
    createRepeatedDecimalSeparatorPreprocessor,
    createThousandSeparatorPostprocessor,
    createZeroPrecisionPreprocessor,
    emptyPostprocessor,
} from './processors';
import {generateMaskExpression, validateDecimalPseudoSeparators} from './utils';

export const DEFAULT_PSEUDO_MINUSES = [
    CHAR_HYPHEN,
    CHAR_EN_DASH,
    CHAR_EM_DASH,
    CHAR_JP_HYPHEN,
    CHAR_MINUS,
];

export function maskitoNumberOptionsGenerator({
    max = Number.MAX_SAFE_INTEGER,
    min = Number.MIN_SAFE_INTEGER,
    precision = 0,
    thousandSeparator = CHAR_NO_BREAK_SPACE,
    decimalSeparator = '.',
    decimalPseudoSeparators: unsafeDecimalPseudoSeparators,
    decimalZeroPadding = false,
    prefix: unsafePrefix = '',
    postfix = '',
    minusSign = CHAR_MINUS,
    minusPseudoSigns = DEFAULT_PSEUDO_MINUSES.filter(
        (char) =>
            char !== thousandSeparator && char !== decimalSeparator && char !== minusSign,
    ),
    maximumFractionDigits = precision,
    minimumFractionDigits = decimalZeroPadding ? maximumFractionDigits : 0,
}: MaskitoNumberParams = {}): Required<MaskitoOptions> {
    const decimalPseudoSeparators = validateDecimalPseudoSeparators({
        decimalSeparator,
        thousandSeparator,
        decimalPseudoSeparators: unsafeDecimalPseudoSeparators,
    });
    const prefix =
        unsafePrefix.endsWith(decimalSeparator) && maximumFractionDigits > 0
            ? `${unsafePrefix}${CHAR_ZERO_WIDTH_SPACE}`
            : unsafePrefix;

    const params: Required<MaskitoNumberParams> = {
        max,
        min,
        precision,
        thousandSeparator,
        decimalSeparator:
            maximumFractionDigits <= 0 && decimalSeparator === thousandSeparator
                ? ''
                : decimalSeparator,
        decimalZeroPadding,
        prefix,
        postfix,
        minusSign,
        minusPseudoSigns,
        maximumFractionDigits,
        minimumFractionDigits: Math.min(minimumFractionDigits, maximumFractionDigits),
        decimalPseudoSeparators,
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
        ],
        postprocessors: [
            createMinMaxPostprocessor(params),
            maskitoPrefixPostprocessorGenerator(prefix),
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
