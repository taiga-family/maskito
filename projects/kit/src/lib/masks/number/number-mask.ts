import type {MaskitoOptions} from '@maskito/core';

import {
    createFullWidthToHalfWidthPreprocessor,
    maskitoPostfixPostprocessorGenerator,
} from '../../processors';
import {type MaskitoNumberParams} from './number-params';
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
import {generateMaskExpression, withNumberDefaults} from './utils';

export function maskitoNumber(options?: MaskitoNumberParams): Required<MaskitoOptions> {
    const params = withNumberDefaults(options);

    return {
        mask: generateMaskExpression(params),
        preprocessors: [
            createFullWidthToHalfWidthPreprocessor(),
            createInitializationOnlyPreprocessor(params),
            createAffixesFilterPreprocessor(params),
            createPseudoCharactersPreprocessor({
                ...params,
                validCharacter: params.minusSign,
                pseudoCharacters: params.minusPseudoSigns,
            }),
            createPseudoCharactersPreprocessor({
                ...params,
                validCharacter: params.decimalSeparator,
                pseudoCharacters: params.decimalPseudoSeparators,
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
            maskitoPostfixPostprocessorGenerator(params.postfix),
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
            params.minimumFractionDigits > 0
                ? ({value, selection: [from]}) =>
                      from <= value.indexOf(params.decimalSeparator) ? 'shift' : 'replace'
                : 'shift',
    };
}

export {
    /**
     * @deprecated Use {@link maskitoNumber} instead.
     */
    maskitoNumber as maskitoNumberOptionsGenerator,
};
