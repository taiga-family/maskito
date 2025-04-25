import type {MaskitoPreprocessor} from '@maskito/core';
import {maskitoTransform} from '@maskito/core';

import {clamp, extractAffixes} from '../../../utils';
import type {MaskitoNumberParams} from '../number-params';
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
    decimalPseudoSeparators,
    decimalSeparator,
    minusSign,
    postfix,
    prefix,
    pseudoMinuses,
}: Pick<
    Required<MaskitoNumberParams>,
    'decimalPseudoSeparators' | 'decimalSeparator' | 'minusSign' | 'postfix' | 'prefix'
> & {pseudoMinuses: readonly string[]}): MaskitoPreprocessor {
    let isInitializationPhase = true;
    const cleanNumberMask = generateMaskExpression({
        decimalSeparator,
        decimalPseudoSeparators,
        pseudoMinuses,
        prefix: '',
        postfix: '',
        thousandSeparator: '',
        maximumFractionDigits: Infinity,
        min: Number.MIN_SAFE_INTEGER,
        minusSign,
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
