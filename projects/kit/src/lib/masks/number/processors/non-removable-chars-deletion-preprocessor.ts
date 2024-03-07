import type {MaskitoPreprocessor} from '@maskito/core';

/**
 * Manage caret-navigation when user "deletes" non-removable digits or separators
 * @example 1,|42 => Backspace => 1|,42 (only if `decimalZeroPadding` is `true`)
 * @example 1|,42 => Delete => 1,|42 (only if `decimalZeroPadding` is `true`)
 * @example 0,|00 => Delete => 0,0|0 (only if `decimalZeroPadding` is `true`)
 * @example 1 |000 => Backspace => 1| 000 (always)
 */
export function createNonRemovableCharsDeletionPreprocessor({
    decimalSeparator,
    thousandSeparator,
    decimalZeroPadding,
}: {
    decimalSeparator: string;
    thousandSeparator: string;
    decimalZeroPadding: boolean;
}): MaskitoPreprocessor {
    return ({elementState, data}, actionType) => {
        const {value, selection} = elementState;
        const [from, to] = selection;
        const selectedCharacters = value.slice(from, to);
        const nonRemovableSeparators = decimalZeroPadding
            ? [decimalSeparator, thousandSeparator]
            : [thousandSeparator];
        const areNonRemovableZeroesSelected =
            decimalZeroPadding &&
            from > value.indexOf(decimalSeparator) &&
            Boolean(selectedCharacters.match(/^0+$/gi));

        if (
            (actionType !== 'deleteBackward' && actionType !== 'deleteForward') ||
            (!nonRemovableSeparators.includes(selectedCharacters) &&
                !areNonRemovableZeroesSelected)
        ) {
            return {
                elementState,
                data,
            };
        }

        return {
            elementState: {
                value,
                selection: actionType === 'deleteForward' ? [to, to] : [from, from],
            },
            data,
        };
    };
}
