import type {MaskitoPreprocessor} from '@maskito/core';

/**
 * Manage caret-navigation when user "deletes" non-removable digits or separators
 * @example 1,|42 => Backspace => 1|,42 (only if `minimumFractionDigits` is `>0`)
 * @example 1|,42 => Delete => 1,|42 (only if `minimumFractionDigits` is `>0`)
 * @example 0,|00 => Delete => 0,0|0 (only if `minimumFractionDigits` is `>0`)
 * @example 1 |000 => Backspace => 1| 000 (always)
 */
export function createNonRemovableCharsDeletionPreprocessor({
    decimalSeparator,
    thousandSeparator,
    minimumFractionDigits,
}: {
    decimalSeparator: string;
    thousandSeparator: string;
    minimumFractionDigits: number;
}): MaskitoPreprocessor {
    return ({elementState, data}, actionType) => {
        const {value, selection} = elementState;
        const [from, to] = selection;
        const selectedCharacters = value.slice(from, to);
        const nonRemovableSeparators = minimumFractionDigits
            ? [decimalSeparator, thousandSeparator]
            : [thousandSeparator];
        const areNonRemovableZeroesSelected =
            Boolean(minimumFractionDigits) &&
            from > value.indexOf(decimalSeparator) &&
            Boolean(selectedCharacters.match(/^0+$/g));

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
