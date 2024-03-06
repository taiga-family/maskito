import type {ElementState, MaskitoMaskExpression} from '../../../types';
import {guessValidValueByPattern} from './guess-valid-value-by-pattern';
import {guessValidValueByRegExp} from './guess-valid-value-by-reg-exp';
import {validateValueWithMask} from './validate-value-with-mask';

export function calibrateValueByMask(
    elementState: ElementState,
    mask: MaskitoMaskExpression,
    initialElementState: ElementState | null = null,
): ElementState {
    if (validateValueWithMask(elementState.value, mask)) {
        return elementState;
    }

    const {value, selection} = Array.isArray(mask)
        ? guessValidValueByPattern(elementState, mask, initialElementState)
        : guessValidValueByRegExp(elementState, mask);

    return {
        selection,
        value: Array.isArray(mask) ? value.slice(0, mask.length) : value,
    };
}
