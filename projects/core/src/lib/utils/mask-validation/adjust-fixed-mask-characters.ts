import {MaskExpression} from '../../types';

export function adjustFixedMaskCharacters(
    value: string,
    mask: MaskExpression,
    isBackspaced = false,
): string {
    if (!Array.isArray(mask)) {
        return value;
    }

    const formattedValue = [
        ...Array.from(value),
        '', // extra iteration to take all tailed fixed characters
    ].reduce((acc, char, charIndex) => {
        let formattedFinalString = acc;

        for (let i = charIndex; i < mask.length; i++) {
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
        return formattedValue;
    }

    return formattedValue.slice(
        0,
        formattedValue.length - getTailedFixedValues(formattedValue, mask).length,
    );
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
