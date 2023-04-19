import {MaskitoOptions} from '@maskito/core';

export function maskitoPostfixPostprocessorGenerator(
    postfix: string,
): NonNullable<MaskitoOptions['postprocessor']> {
    return ({value, selection}, initialElementState) => {
        if (
            value.endsWith(postfix) || // already valid
            (!value && !initialElementState.value.endsWith(postfix)) // cases when developer wants input to be empty
        ) {
            return {value, selection};
        }

        if (!value.endsWith(postfix) && !initialElementState.value.endsWith(postfix)) {
            return {selection, value: value + postfix};
        }

        let newValue = value;

        Array.from(postfix)
            .reverse()
            .forEach((char, index) => {
                const i = newValue.length - 1 - index;

                if (newValue[i] !== char) {
                    newValue = newValue.slice(0, i + 1) + char + newValue.slice(i + 1);
                }
            });

        return {
            selection,
            value: newValue,
        };
    };
}
