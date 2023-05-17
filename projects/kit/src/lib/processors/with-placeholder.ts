import {MaskitoOptions} from '@maskito/core';

export function maskitoWithPlaceholder(placeholder: string): Pick<
    Required<MaskitoOptions>,
    'postprocessor' | 'preprocessor'
> & {
    removePlaceholder: (value: string) => string;
} {
    const removePlaceholder = (value: string): string => {
        for (let i = value.length - 1; i >= 0; i--) {
            if (value[i] !== placeholder[i]) {
                return value.slice(0, i + 1);
            }
        }

        return '';
    };

    return {
        preprocessor: ({elementState, data}) => {
            const {value, selection} = elementState;

            return {
                elementState: {
                    selection,
                    value: removePlaceholder(value),
                },
                data,
            };
        },
        postprocessor: ({value, selection}, initialElementState) =>
            initialElementState.value
                ? {
                      value: value + placeholder.slice(value.length),
                      selection,
                  }
                : {value, selection},
        removePlaceholder,
    };
}
