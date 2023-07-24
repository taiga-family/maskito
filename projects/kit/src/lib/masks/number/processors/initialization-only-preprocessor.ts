import {MaskitoPreprocessor, maskitoTransform} from '@maskito/core';

import {generateMaskExpression} from '../utils';

/**
 * This preprocessor works only once at initialization phase (when `new Maskito(...)` is executed).
 * This preprocessor helps to avoid conflicts during transition from one mask to another (for the same input).
 * For example, the developer changes postfix (or other mask's props) during run-time.
 * ```
 * let maskitoOptions = maskitoNumberOptionsGenerator({postfix: ' year'});
 * // [3 seconds later]
 * maskitoOptions = maskitoNumberOptionsGenerator({postfix: ' years'});
 * ```
 */
export function createInitializationOnlyPreprocessor({
    decimalSeparator,
    decimalPseudoSeparators,
    pseudoMinuses,
}: {
    decimalSeparator: string;
    decimalPseudoSeparators: readonly string[];
    pseudoMinuses: readonly string[];
}): MaskitoPreprocessor {
    let isInitializationPhase = true;
    const cleanNumberMask = generateMaskExpression({
        decimalSeparator,
        decimalPseudoSeparators,
        pseudoMinuses,
        prefix: '',
        postfix: '',
        thousandSeparator: '',
        precision: Infinity,
        isNegativeAllowed: true,
    });

    return ({elementState, data}) => {
        if (!isInitializationPhase) {
            return {elementState, data};
        }

        isInitializationPhase = false;

        return {
            elementState: maskitoTransform(elementState, {
                mask: cleanNumberMask,
            }),
            data,
        };
    };
}
