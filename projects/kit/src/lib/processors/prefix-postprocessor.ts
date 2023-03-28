import {MaskitoOptions} from '@maskito/core';

export function maskitoPrefixPostprocessorGenerator(
    prefix: string,
): NonNullable<MaskitoOptions['postprocessor']> {
    return ({value, selection}, initialElementState) => {
        const minCaretIndex = prefix.length;

        if (value.length < minCaretIndex && initialElementState.value) {
            return {selection: [minCaretIndex, minCaretIndex], value: prefix};
        }

        const [from, to] = selection;

        return value.length && !value.startsWith(prefix)
            ? {
                  selection: [from + prefix.length, to + prefix.length],
                  value: prefix + value,
              }
            : {selection, value};
    };
}
