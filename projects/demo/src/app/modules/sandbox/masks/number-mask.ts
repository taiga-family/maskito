import {MaskitoOptions} from '@maskito/core';

export function maskitoNumberOptionsGenerator({
    separator,
    pseudoSeparators = [],
}: {
    separator: string;
    pseudoSeparators?: string[];
}): MaskitoOptions {
    const PSEUDO_COMMA_REG_EXP = new RegExp(`[${pseudoSeparators.join('')}]`, 'gi');
    const MASK = new RegExp(`^\\d+(${separator}\\d*)?$`);

    return {
        mask: MASK,
        preprocessor: ({elementState, data}) => {
            const {value, selection} = elementState;

            return {
                elementState: {
                    selection,
                    value: value.replace(PSEUDO_COMMA_REG_EXP, separator),
                },
                data: data?.replace(PSEUDO_COMMA_REG_EXP, separator),
            };
        },
    };
}
