import {ElementState, MaskitoMaskExpression} from '../../../types';
import {isFixedCharacter} from './is-fixed-character';

export function removeFixedMaskCharacters(
    initialElementState: ElementState,
    mask: MaskitoMaskExpression,
): ElementState {
    if (!Array.isArray(mask)) {
        return initialElementState;
    }

    const [from, to] = initialElementState.selection;
    const selection: number[] = [];

    const unmaskedValue = Array.from(initialElementState.value).reduce(
        (rawValue, char, i) => {
            const charConstraint = mask[i];

            if (i === from) {
                selection.push(rawValue.length);
            }

            if (i === to) {
                selection.push(rawValue.length);
            }

            return isFixedCharacter(charConstraint) && charConstraint === char
                ? rawValue
                : rawValue + char;
        },
        '',
    );

    if (selection.length < 2) {
        selection.push(...new Array(2 - selection.length).fill(unmaskedValue.length));
    }

    return {
        value: unmaskedValue,
        selection: [selection[0], selection[1]],
    };
}
