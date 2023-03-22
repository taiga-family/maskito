import {MaskitoOptions, maskitoPipe} from '@maskito/core';

import {
    CHAR_EM_DASH,
    CHAR_EN_DASH,
    CHAR_HYPHEN,
    CHAR_MINUS,
    CHAR_NO_BREAK_SPACE,
} from '../../constants';
import {
    createDecimalZeroPaddingPostprocessor,
    createLeadingZeroesValidationPostprocessor,
    createMaxValidationPostprocessor,
    createNonRemovableCharsDeletionPreprocessor,
    createNotEmptyIntegerPartPreprocessor,
    createPseudoCharactersPreprocessor,
    createThousandSeparatorPostprocessor,
    createZeroPrecisionPreprocessor,
} from './processors';
import {generateMaskExpression, getDefaultPseudoSeparators} from './utils';

export function maskitoNumberOptionsGenerator({
    max = Number.MAX_SAFE_INTEGER,
    isNegativeAllowed = true,
    precision = 0,
    thousandSeparator = CHAR_NO_BREAK_SPACE,
    decimalSeparator = '.',
    decimalPseudoSeparators = getDefaultPseudoSeparators(
        decimalSeparator,
        thousandSeparator,
    ),
    decimalZeroPadding = false,
}: {
    max?: number;
    isNegativeAllowed?: boolean;
    precision?: number;
    decimalSeparator?: string;
    decimalPseudoSeparators?: string[];
    decimalZeroPadding?: boolean;
    thousandSeparator?: string;
} = {}): MaskitoOptions {
    const pseudoMinuses = [CHAR_HYPHEN, CHAR_EN_DASH, CHAR_EM_DASH].filter(
        char => char !== thousandSeparator && char !== decimalSeparator,
    );

    return {
        mask: generateMaskExpression({
            decimalSeparator,
            precision,
            thousandSeparator,
            isNegativeAllowed,
        }),
        preprocessor: maskitoPipe(
            createPseudoCharactersPreprocessor(CHAR_MINUS, pseudoMinuses),
            createPseudoCharactersPreprocessor(decimalSeparator, decimalPseudoSeparators),
            createNotEmptyIntegerPartPreprocessor({decimalSeparator, precision}),
            createNonRemovableCharsDeletionPreprocessor({
                decimalSeparator,
                decimalZeroPadding,
                thousandSeparator,
            }),
            createZeroPrecisionPreprocessor(precision, decimalSeparator),
        ),
        postprocessor: maskitoPipe(
            createLeadingZeroesValidationPostprocessor(decimalSeparator),
            createMaxValidationPostprocessor({decimalSeparator, max}),
            createThousandSeparatorPostprocessor({decimalSeparator, thousandSeparator}),
            createDecimalZeroPaddingPostprocessor({
                decimalSeparator,
                decimalZeroPadding,
                precision,
            }),
        ),
        overwriteMode: decimalZeroPadding
            ? ({value, selection: [from]}) =>
                  from <= value.indexOf(decimalSeparator) ? 'shift' : 'replace'
            : 'shift',
    };
}
