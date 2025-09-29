import type {MaskitoPreprocessor} from '@maskito/core';
import {maskitoTransform} from '@maskito/core';

import type {MaskitoNumberParams} from '../number-params';
import {fromNumberParts, generateMaskExpression, toNumberParts} from '../utils';

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
export function createInitializationOnlyPreprocessor(
    params: Pick<
        Required<MaskitoNumberParams>,
        | 'decimalPseudoSeparators'
        | 'decimalSeparator'
        | 'maximumFractionDigits'
        | 'minusPseudoSigns'
        | 'minusSign'
        | 'negativePattern'
        | 'postfix'
        | 'prefix'
    >,
): MaskitoPreprocessor {
    let isInitializationPhase = true;
    const cleanNumberMask = generateMaskExpression({
        ...params,
        prefix: '',
        postfix: '',
        thousandSeparator: '',
        maximumFractionDigits: Infinity,
        min: Number.MIN_SAFE_INTEGER,
    });

    return ({elementState, data}) => {
        if (!isInitializationPhase) {
            return {elementState, data};
        }

        isInitializationPhase = false;

        const {value, selection} = elementState;
        const [from, to] = selection;
        const {prefix, postfix, ...numberParts} = toNumberParts(value, params);
        const onlyNumber = fromNumberParts(numberParts, params);
        const cleanState = maskitoTransform(
            {
                selection: [
                    Math.max(from - prefix.length, 0),
                    Math.max(to - prefix.length, 0),
                ],
                value: onlyNumber,
            },
            {
                mask: cleanNumberMask,
            },
        );
        const deleted =
            onlyNumber.slice(0, Math.max(to - prefix.length, 0)).length -
            cleanState.value.slice(0, cleanState.selection[1]).length;

        return {
            elementState: {
                selection: [from - deleted, to - deleted],
                value: fromNumberParts(
                    {
                        ...toNumberParts(cleanState.value, params),
                        prefix,
                        postfix,
                    },
                    params,
                ),
            },
            data,
        };
    };
}
