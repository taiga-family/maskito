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

export function maskitoNumberOptionsGenerator({
    max = Number.MAX_SAFE_INTEGER,
    min = Number.MIN_SAFE_INTEGER,
    precision = 0,
    thousandSeparator = CHAR_NO_BREAK_SPACE,
    decimalSeparator = '.',
    decimalPseudoSeparators,
    decimalZeroPadding = false,
    prefix: unsafePrefix = '',
    postfix = '',
    minusSign = CHAR_MINUS,
    maximumFractionDigits = precision,
    minimumFractionDigits = decimalZeroPadding ? maximumFractionDigits : 0,
}: MaskitoNumberParams = {}): Required<MaskitoOptions> {
    const pseudoMinuses = [
        CHAR_HYPHEN,
        CHAR_EN_DASH,
        CHAR_EM_DASH,
        CHAR_JP_HYPHEN,
        CHAR_MINUS,
    ].filter(
        (char) =>
            char !== thousandSeparator && char !== decimalSeparator && char !== minusSign,
    );
    const validatedDecimalPseudoSeparators = validateDecimalPseudoSeparators({
        decimalSeparator,
        thousandSeparator,
        decimalPseudoSeparators,
    });
    const prefix =
        unsafePrefix.endsWith(decimalSeparator) && maximumFractionDigits > 0
            ? `${unsafePrefix}${CHAR_ZERO_WIDTH_SPACE}`
            : unsafePrefix;

    const initializationOnlyPreprocessor = createInitializationOnlyPreprocessor({
        decimalSeparator,
        decimalPseudoSeparators: validatedDecimalPseudoSeparators,
        pseudoMinuses,
        prefix,
        postfix,
        minusSign,
    });

    decimalSeparator =
        maximumFractionDigits <= 0 && decimalSeparator === thousandSeparator
            ? ''
            : decimalSeparator;

    return {
        ...MASKITO_DEFAULT_OPTIONS,
        mask: generateMaskExpression({
            decimalSeparator,
            maximumFractionDigits,
            thousandSeparator,
            prefix,
            postfix,
            isNegativeAllowed: min < 0,
            minusSign,
        }),
        preprocessors: [
            createFullWidthToHalfWidthPreprocessor(),
            initializationOnlyPreprocessor,
            createAffixesFilterPreprocessor({prefix, postfix}),
            createPseudoCharactersPreprocessor({
                validCharacter: minusSign,
                pseudoCharacters: pseudoMinuses,
                prefix,
                postfix,
            }),
            createPseudoCharactersPreprocessor({
                validCharacter: decimalSeparator,
                pseudoCharacters: validatedDecimalPseudoSeparators,
                prefix,
                postfix,
            }),
            createNotEmptyIntegerPartPreprocessor({
                decimalSeparator,
                maximumFractionDigits,
                prefix,
                postfix,
            }),
            createNonRemovableCharsDeletionPreprocessor({
                decimalSeparator,
                minimumFractionDigits,
                thousandSeparator,
            }),
            createZeroPrecisionPreprocessor({
                maximumFractionDigits,
                decimalSeparator,
                prefix,
                postfix,
            }),
            createRepeatedDecimalSeparatorPreprocessor({
                decimalSeparator,
                prefix,
                postfix,
            }),
        ],
        postprocessors: [
            createMinMaxPostprocessor({decimalSeparator, min, max, minusSign}),
            maskitoPrefixPostprocessorGenerator(prefix),
            maskitoPostfixPostprocessorGenerator(postfix),
            createThousandSeparatorPostprocessor({
                decimalSeparator,
                thousandSeparator,
                prefix,
                postfix,
                minusSign,
            }),
            createDecimalZeroPaddingPostprocessor({
                decimalSeparator,
                prefix,
                postfix,
                minimumFractionDigits: Math.min(
                    minimumFractionDigits,
                    maximumFractionDigits,
                ),
            }),
            emptyPostprocessor({
                prefix,
                postfix,
                decimalSeparator,
                minusSign,
            }),
        ],
        plugins: [
            createLeadingZeroesValidationPlugin({
                decimalSeparator,
                thousandSeparator,
                prefix,
                postfix,
            }),
            createNotEmptyIntegerPlugin({
                decimalSeparator,
                prefix,
                postfix,
            }),
            createMinMaxPlugin({min, max, decimalSeparator}),
        ],
        overwriteMode:
            minimumFractionDigits > 0
                ? ({value, selection: [from]}) =>
                      from <= value.indexOf(decimalSeparator) ? 'shift' : 'replace'
                : 'shift',
    };
}
