import {MASKITO_DEFAULT_OPTIONS, MaskitoOptions} from '@maskito/core';

import {
    CHAR_EM_DASH,
    CHAR_EN_DASH,
    CHAR_HYPHEN,
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
    createInitializationOnlyPreprocessor,
    createMinMaxPostprocessor,
    createNonRemovableCharsDeletionPreprocessor,
    createNotEmptyIntegerPartPreprocessor,
    createPseudoCharactersPreprocessor,
    createRepeatedDecimalSeparatorPreprocessor,
    createThousandSeparatorPostprocessor,
    createZeroPrecisionPreprocessor,
} from './processors';
import {generateMaskExpression, validatePseudoSeparators} from './utils';

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
    const pseudoMinuses = [CHAR_HYPHEN, CHAR_EN_DASH, CHAR_EM_DASH].filter(
        char => char !== thousandSeparator && char !== decimalSeparator,
    );
    const validatedDecimalPseudoSeparators = validatePseudoSeparators({
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
            createPseudoCharactersPreprocessor(CHAR_MINUS, pseudoMinuses),
            createPseudoCharactersPreprocessor(
                decimalSeparator,
                validatedDecimalPseudoSeparators,
            ),
            createNotEmptyIntegerPartPreprocessor({decimalSeparator, precision}),
            createNonRemovableCharsDeletionPreprocessor({
                decimalSeparator,
                decimalZeroPadding,
                thousandSeparator,
            }),
            createZeroPrecisionPreprocessor(precision, decimalSeparator),
            createRepeatedDecimalSeparatorPreprocessor(decimalSeparator),
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
                postfix,
            }),
        ],
        plugins: [
            createLeadingZeroesValidationPlugin(decimalSeparator, thousandSeparator),
            createNotEmptyIntegerPlugin(decimalSeparator),
            createMinMaxPlugin({min, max, decimalSeparator}),
        ],
        overwriteMode: decimalZeroPadding
            ? ({value, selection: [from]}) =>
                  from <= value.indexOf(decimalSeparator) ? 'shift' : 'replace'
            : 'shift',
    };
}
