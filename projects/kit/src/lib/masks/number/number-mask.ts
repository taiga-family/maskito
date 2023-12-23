import {MASKITO_DEFAULT_OPTIONS, MaskitoOptions} from '@maskito/core';

import {
    CHAR_EM_DASH,
    CHAR_EN_DASH,
    CHAR_HYPHEN,
    CHAR_JP_HYPHEN,
    CHAR_MINUS,
    CHAR_NO_BREAK_SPACE,
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
    prefix = '',
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
            createInitializationOnlyPreprocessor({
                decimalSeparator,
                decimalPseudoSeparators: validatedDecimalPseudoSeparators,
                pseudoMinuses,
            }),
            createFullWidthToHalfWidthPreprocessor(),
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
            createNotEmptyIntegerPartPreprocessor({decimalSeparator, precision}),
            createNonRemovableCharsDeletionPreprocessor({
                decimalSeparator,
                decimalZeroPadding,
                thousandSeparator,
            }),
            createZeroPrecisionPreprocessor(precision, decimalSeparator),
            createRepeatedDecimalSeparatorPreprocessor({
                decimalSeparator,
                prefix,
                postfix,
            }),
        ],
        postprocessors: [
            createMinMaxPostprocessor({decimalSeparator, min, max, prefix, postfix}),
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
            createMinMaxPlugin({min, max, decimalSeparator, prefix, postfix}),
        ],
        overwriteMode: decimalZeroPadding
            ? ({value, selection: [from]}) =>
                  from <= value.indexOf(decimalSeparator) ? 'shift' : 'replace'
            : 'shift',
    };
}
