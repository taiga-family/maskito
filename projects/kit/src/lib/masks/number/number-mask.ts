import {MASKITO_DEFAULT_OPTIONS, MaskitoOptions} from '@maskito/core';

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
    maskitoPostfixPostprocessorGenerator,
    maskitoPrefixPostprocessorGenerator,
} from '../../processors';
import {
    createLeadingZeroesValidationPlugin,
    createMinMaxPlugin,
    createNotEmptyIntegerPlugin,
} from './plugins';
import {
    createAffixesFilterPreprocessor,
    createDecimalZeroPaddingPostprocessor,
    createFullWidthToHalfWidthPreprocessor,
    createInitializationOnlyPreprocessor,
    createMinMaxPostprocessor,
    createNonRemovableCharsDeletionPreprocessor,
    createNotEmptyIntegerPartPreprocessor,
    createPseudoCharactersPreprocessor,
    createRepeatedDecimalSeparatorPreprocessor,
    createThousandSeparatorPostprocessor,
    createZeroPrecisionPreprocessor,
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
}: {
    min?: number;
    max?: number;
    precision?: number;
    decimalSeparator?: string;
    decimalPseudoSeparators?: string[];
    decimalZeroPadding?: boolean;
    thousandSeparator?: string;
    prefix?: string;
    postfix?: string;
} = {}): Required<MaskitoOptions> {
    const pseudoMinuses = [
        CHAR_HYPHEN,
        CHAR_EN_DASH,
        CHAR_EM_DASH,
        CHAR_JP_HYPHEN,
    ].filter(char => char !== thousandSeparator && char !== decimalSeparator);
    const validatedDecimalPseudoSeparators = validateDecimalPseudoSeparators({
        decimalSeparator,
        thousandSeparator,
        decimalPseudoSeparators,
    });
    const prefix =
        unsafePrefix.endsWith(decimalSeparator) && precision > 0
            ? `${unsafePrefix}${CHAR_ZERO_WIDTH_SPACE}`
            : unsafePrefix;

    return {
        ...MASKITO_DEFAULT_OPTIONS,
        mask: generateMaskExpression({
            decimalSeparator,
            precision,
            thousandSeparator,
            prefix,
            postfix,
            isNegativeAllowed: min < 0,
        }),
        preprocessors: [
            createFullWidthToHalfWidthPreprocessor(),
            createInitializationOnlyPreprocessor({
                decimalSeparator,
                decimalPseudoSeparators: validatedDecimalPseudoSeparators,
                pseudoMinuses,
                prefix,
                postfix,
            }),
            createAffixesFilterPreprocessor({prefix, postfix}),
            createPseudoCharactersPreprocessor({
                validCharacter: CHAR_MINUS,
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
                precision,
                prefix,
                postfix,
            }),
            createNonRemovableCharsDeletionPreprocessor({
                decimalSeparator,
                decimalZeroPadding,
                thousandSeparator,
            }),
            createZeroPrecisionPreprocessor({
                precision,
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
            createMinMaxPostprocessor({decimalSeparator, min, max}),
            maskitoPrefixPostprocessorGenerator(prefix),
            maskitoPostfixPostprocessorGenerator(postfix),
            createThousandSeparatorPostprocessor({
                decimalSeparator,
                thousandSeparator,
                prefix,
                postfix,
            }),
            createDecimalZeroPaddingPostprocessor({
                decimalSeparator,
                decimalZeroPadding,
                precision,
                prefix,
                postfix,
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
        overwriteMode: decimalZeroPadding
            ? ({value, selection: [from]}) =>
                  from <= value.indexOf(decimalSeparator) ? 'shift' : 'replace'
            : 'shift',
    };
}
