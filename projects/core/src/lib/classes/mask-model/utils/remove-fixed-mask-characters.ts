import {ElementState, MaskExpression} from '../../../types';
import {isFixedCharacter} from './is-fixed-character';

export function removeFixedMaskCharacters(
    initialElementState: ElementState,
    mask: MaskExpression,
): ElementState {
    if (!Array.isArray(mask)) {
        return initialElementState;
    }

    const {value, selection} = initialElementState;
    const [from, to] = selection;
    const unmaskedSelection: number[] = [];

    const unmaskedValue = Array.from(value).reduce((rawValue, char, i) => {
        const charConstraint = mask[i];

        if (i === from) {
            unmaskedSelection.push(rawValue.length);
        }

        if (i === to) {
            unmaskedSelection.push(rawValue.length);
        }

        return isFixedCharacter(charConstraint) && charConstraint === char
            ? rawValue
            : rawValue + char;
    }, '');

    if (unmaskedSelection.length < 2) {
        unmaskedSelection.push(
            ...Array(2 - unmaskedSelection.length).fill(unmaskedValue.length),
        );
    }

    return {
        value: unmaskedValue,
        selection: unmaskedSelection as [number, number],
    };
}
