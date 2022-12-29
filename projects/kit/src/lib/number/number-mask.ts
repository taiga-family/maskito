import {MaskitoOptions, maskitoPipe} from '@maskito/core';
import {
    createDecimalZeroPaddingPostprocessor,
    createLeadingZeroesValidationPostprocessor,
    createNotEmptyIntegerPartPreprocessor,
    createPseudoSeparatorsPreprocessor,
    createSeparatorDeletionPreprocessor,
    createThousandSeparatorPostprocessor,
} from './processors';
import {generateMaskExpression} from './utils';

export function maskitoNumberOptionsGenerator({
    min = Number.MIN_SAFE_INTEGER,
    precision = 0,
    decimalSeparator = ',',
    decimalPseudoSeparators = ['.', 'б', 'ю'],
    decimalZeroPadding = false,
    thousandSeparator = '\u00A0',
}: {
    min?: number; // TODO it will be finished in next PR
    max?: number; // TODO it will be finished in next PR
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
            isNegativeAllowed: min < 0,
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
