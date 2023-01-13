import {MaskitoOptions} from '@maskito/core';

/**
 * It replaces pseudo separators with valid one.
 * @example User types '.' (but separator is equal to comma) => dot is replaced with comma.
 */
export function createPseudoSeparatorsPreprocessor(
    validSeparator: string,
    pseudoSeparators: string[],
): NonNullable<MaskitoOptions['preprocessor']> {
    const pseudoSeparatorRegExp = new RegExp(`[${pseudoSeparators.join('')}]`, 'gi');

    return ({elementState, data}) => {
        const {value, selection} = elementState;

        return {
            elementState: {
                selection,
                value: value.replace(pseudoSeparatorRegExp, validSeparator),
            },
            data: data.replace(pseudoSeparatorRegExp, validSeparator),
        };
    };
}
