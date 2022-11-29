import {ElementState, MaskExpression} from '../../../types';
import {validateValueWithMask} from './validate-value-with-mask';
import {guessValidValueByPattern} from './guess-valid-value-by-pattern';
import {guessValidValueByRegExp} from './guess-valid-value-by-reg-exp';

export function calibrateValueByMask(
    elementState: ElementState,
    mask: MaskExpression,
): ElementState {
    if (validateValueWithMask(elementState.value, mask)) {
        return elementState;
    }

    const {value, selection} = Array.isArray(mask)
        ? guessValidValueByPattern(elementState, mask)
        : guessValidValueByRegExp(elementState, mask);

    return {
        selection,
        value: Array.isArray(mask) ? value.slice(0, mask.length) : value,
    };
}
