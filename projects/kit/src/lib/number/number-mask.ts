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
import {generateMaskExpression} from './utils';

export function maskitoNumberOptionsGenerator({
    max = Number.MAX_SAFE_INTEGER,
    isNegativeAllowed = true,
    precision = 0,
    decimalSeparator = ',',
    decimalPseudoSeparators = ['.', 'б', 'ю'],
    decimalZeroPadding = false,
    thousandSeparator = '\u00A0',
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
