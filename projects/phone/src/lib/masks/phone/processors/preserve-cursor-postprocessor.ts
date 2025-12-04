import type {MaskitoPostprocessor} from '@maskito/core';

/**
 * Preserves cursor position during deletion and validation operations on phone masks.
 *
 * When the mask recalibrates the value (during deletion or validation),
 * the dynamic mask can cause cursor position calculations to fail,
 * moving the cursor to an incorrect position. This postprocessor
 * calculates cursor position based on digit index rather than character
 * index, ensuring the cursor stays in the correct position.
 */
export function preserveCursorPostprocessorGenerator(): MaskitoPostprocessor {
    return (elementState, initialElementState) => {
        const {value, selection} = elementState;
        const [newFrom, newTo] = selection;
        const initialValue = initialElementState.value;
        const [initialFrom] = initialElementState.selection;

        // Only process single-cursor selections (not range selections)
        if (newFrom !== newTo) {
            return elementState;
        }

        // Only apply fix during deletion (value got shorter) or validation (value length unchanged)
        // Don't interfere with typing (value got longer)
        const valueGotLonger = value.length > initialValue.length;

        if (valueGotLonger) {
            return elementState;
        }

        // Check if cursor was in the middle (not at the end) before the operation
        const wasInMiddle = initialFrom < initialValue.length;

        if (!wasInMiddle) {
            return elementState;
        }

        // Calculate digit index of cursor position in initial value
        const initialDigitIndex = countDigitsBeforePosition(initialValue, initialFrom);

        // Find the character position in new value that corresponds to the same digit index
        const expectedCursorPosition = findPositionForDigitIndex(
            value,
            initialDigitIndex,
        );

        // Apply the corrected cursor position if it differs from the current position
        if (expectedCursorPosition !== null && expectedCursorPosition !== newFrom) {
            return {
                value,
                selection: [expectedCursorPosition, expectedCursorPosition],
            };
        }

        return elementState;
    };
}

/**
 * Count how many digits appear before a given position in the string.
 */
function countDigitsBeforePosition(value: string, position: number): number {
    let digitCount = 0;

    for (let i = 0; i < position && i < value.length; i++) {
        if (/\d/.test(value[i]!)) {
            digitCount++;
        }
    }

    return digitCount;
}

/**
 * Find the character position that comes after the Nth digit.
 */
function findPositionForDigitIndex(
    value: string,
    targetDigitIndex: number,
): number | null {
    let digitCount = 0;

    for (let i = 0; i < value.length; i++) {
        if (/\d/.test(value[i]!)) {
            digitCount++;
        }

        if (digitCount === targetDigitIndex) {
            // Return position after this digit
            return i + 1;
        }
    }

    // If we have fewer digits than the target, return position after last digit
    if (digitCount > 0 && digitCount < targetDigitIndex) {
        for (let i = value.length - 1; i >= 0; i--) {
            if (/\d/.test(value[i]!)) {
                return i + 1;
            }
        }
    }

    return null;
}
