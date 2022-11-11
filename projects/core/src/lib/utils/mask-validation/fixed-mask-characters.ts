import {MaskExpression} from '../../types';

export function removeFixedMaskCharacters(
    value: string,
    mask: Array<RegExp | string>,
    caretPositionBefore: number,
): {newValue: string; newCaretPosition: number} {
    let newCaretPosition = caretPositionBefore;
    const newValue = Array.from(value).reduce((valueWithoutFixedChars, char, i) => {
        const charConstraint = mask[i];

        if (i === caretPositionBefore) {
            newCaretPosition = valueWithoutFixedChars.length;
        }

        return typeof charConstraint === 'string' && charConstraint === char
            ? valueWithoutFixedChars
            : valueWithoutFixedChars + char;
    }, '');

    return {newValue, newCaretPosition};
}

export function addFixedMaskCharacters(
    value: string,
    mask: MaskExpression,
    isBackspaced = false,
    caretPositionBefore: number,
): {formattedValue: string; newCaretPosition: number} {
    let newCaretPosition = caretPositionBefore;

    if (!Array.isArray(mask)) {
        return {formattedValue: value, newCaretPosition};
    }

    const formattedValue = [
        ...Array.from(value),
        '', // extra iteration to take all tailed fixed characters
    ].reduce((acc, char, charIndex) => {
        let formattedFinalString = acc;

        if (charIndex === caretPositionBefore) {
            newCaretPosition = formattedFinalString.length;
        }

        for (let i = formattedFinalString.length; i < mask.length; i++) {
            const charConstraint = mask[i];
            const isFixedChar = typeof charConstraint === 'string';

            if (!isFixedChar || charConstraint === char) {
                return formattedFinalString + char;
            }

            formattedFinalString += charConstraint;
        }

        return formattedFinalString;
    }, '');

    if (!isBackspaced) {
        return {formattedValue, newCaretPosition};
    }

    return {
        formattedValue: formattedValue.slice(
            0,
            formattedValue.length - getTailedFixedValues(formattedValue, mask).length,
        ),
        newCaretPosition,
    };
}

function getTailedFixedValues(
    value: string,
    mask: MaskExpression,
    prevAccumulatedValue = '',
): string {
    if (!Array.isArray(mask)) {
        return '';
    }

    const lastCharIndex = value.length - 1;
    const lastCharConstraint = mask[lastCharIndex];

    if (typeof lastCharConstraint !== 'string') {
        return prevAccumulatedValue;
    }

    return getTailedFixedValues(
        value.slice(0, lastCharIndex),
        mask,
        lastCharConstraint + prevAccumulatedValue,
    );
}
