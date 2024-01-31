import {MaskitoPreprocessor, maskitoTransform} from '@maskito/core';

import {clamp, extractAffixes} from '../../../utils';
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
    prefix,
    postfix,
}: {
    decimalSeparator: string;
    decimalPseudoSeparators: readonly string[];
    pseudoMinuses: readonly string[];
    prefix: string;
    postfix: string;
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

        const {value, selection} = elementState;
        const [from, to] = selection;
        const {extractedPrefix, cleanValue, extractedPostfix} = extractAffixes(value, {
            prefix,
            postfix,
        });
        const cleanState = maskitoTransform(
            {
                selection: [
                    Math.max(from - extractedPrefix.length, 0),
                    clamp(to - extractedPrefix.length, 0, cleanValue.length),
                ],
                value: cleanValue,
            },
            {
                mask: cleanNumberMask,
            },
        );
        const [cleanFrom, cleanTo] = cleanState.selection;

        return {
            elementState: {
                selection: [
                    cleanFrom + extractedPrefix.length,
                    cleanTo + extractedPrefix.length,
                ],
                value: extractedPrefix + cleanState.value + extractedPostfix,
            },
            data,
        };
    };
}
