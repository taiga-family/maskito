import {MaskExpression} from '../../../types';
import {isFixedCharacter} from './is-fixed-character';

export function removeFixedMaskCharacters(
    value: string,
    mask: MaskExpression,
    selection: [from: number, to: number],
): {unmaskedValue: string; unmaskedSelection: [from: number, to: number]} {
    if (!Array.isArray(mask)) {
        return {unmaskedValue: value, unmaskedSelection: selection};
    }

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
        unmaskedSelection.push(unmaskedValue.length);
    }

    return {
        unmaskedValue,
        unmaskedSelection: unmaskedSelection as [number, number],
    };
}
