import {MaskitoOptions, MaskitoPreprocessorAction} from '@maskito/core';

/**
 * Manage caret-navigation when user "deletes" non-removable separators
 * @example 1,|42 => Backspace => 1|,42 (only if `decimalZeroPadding` is `true`)
 * @example 1|,42 => Delete => 1,|42 (only if `decimalZeroPadding` is `true`)
 * @example 1 |000 => Backspace => 1| 000 (always)
 */
export function createSeparatorDeletionPreprocessor({
    decimalSeparator,
    thousandSeparator,
    decimalZeroPadding,
}: {
    decimalSeparator: string;
    thousandSeparator: string;
    decimalZeroPadding: boolean;
}): NonNullable<MaskitoOptions['preprocessor']> {
    return ({elementState, data}, actionType) => {
        const {value, selection} = elementState;
        const [from, to] = selection;
        const selectedCharacters = value.slice(from, to);
        const nonRemovableSeparators = decimalZeroPadding
            ? [decimalSeparator, thousandSeparator]
            : [thousandSeparator];

        if (
            (actionType !== MaskitoPreprocessorAction.DeleteBackward &&
                actionType !== MaskitoPreprocessorAction.DeleteForward) ||
            !nonRemovableSeparators.includes(selectedCharacters)
        ) {
            return {
                elementState,
                data,
            };
        }

        return {
            elementState: {
                value,
                selection:
                    actionType === MaskitoPreprocessorAction.DeleteForward
                        ? [to, to]
                        : [from, from],
            },
            data,
        };
    };
}
