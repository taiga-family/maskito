import {MaskitoOptions, maskitoPipe} from '@maskito/core';
import {
    createDecimalZeroPaddingPostprocessor,
    createLeadingZeroesValidationPostprocessor,
    createMaxValidationPostprocessor,
    createNotEmptyIntegerPartPreprocessor,
    createPseudoSeparatorsPreprocessor,
    createSeparatorDeletionPreprocessor,
    createThousandSeparatorPostprocessor,
} from './processors';
import {generateMaskExpression, getDefaultPseudoSeparators} from './utils';
import {CHAR_NO_BREAK_SPACE} from '../../constants';

export function maskitoNumberOptionsGenerator({
    max = Number.MAX_SAFE_INTEGER,
    isNegativeAllowed = true,
    precision = 0,
    thousandSeparator = CHAR_NO_BREAK_SPACE,
    decimalSeparator = ',',
    decimalPseudoSeparators = getDefaultPseudoSeparators({
        decimalSeparator,
        thousandSeparator,
    }),
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
    return {
        mask: generateMaskExpression({
            decimalSeparator,
            precision,
            thousandSeparator,
            isNegativeAllowed,
        }),
        preprocessor: maskitoPipe(
            createPseudoSeparatorsPreprocessor(decimalSeparator, decimalPseudoSeparators),
            createNotEmptyIntegerPartPreprocessor({decimalSeparator, precision}),
            createSeparatorDeletionPreprocessor({
                decimalSeparator,
                decimalZeroPadding,
                thousandSeparator,
            }),
        ),
        postprocessor: maskitoPipe(
            createLeadingZeroesValidationPostprocessor(decimalSeparator),
            createMaxValidationPostprocessor({decimalSeparator, max, thousandSeparator}),
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
