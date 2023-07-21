import {MaskitoMask, MaskitoPreprocessor, maskitoTransform} from '@maskito/core';

/**
 * This preprocessor works only once at initialization phase (when `new Maskito(...)` is executed).
 * This preprocessor helps to avoid conflicts during transition from one mask to another (for the same input).
 * For example, the developer changes postfix (or other mask's props) during run-time.
 * ```
 * const maskitoOptions = maskitoNumberOptionsGenerator({postfix: ' year'});
 * // [3 seconds later]
 * const maskitoOptions = maskitoNumberOptionsGenerator({postfix: ' years'});
 * ```
 */
export function createInitializationOnlyPreprocessor(
    cleanNumberMask: MaskitoMask,
): MaskitoPreprocessor {
    let isInitializationPhase = true;

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
