import {MaskitoOptions} from '@maskito/core';

export function maskitoWithGuide(
    guide: string,
): Omit<Required<MaskitoOptions>, 'mask'> & {removeGuide: (value: string) => string} {
    const removeGuide = (value: string): string => {
        for (let i = value.length - 1; i >= 0; i--) {
            const valueChar = value[i];
            const placeholderChar = guide[i];

            if (valueChar !== placeholderChar) {
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
                    value: removeGuide(value),
                },
                data,
            };
        },
        postprocessor: ({value, selection}, initialElementState) => {
            return initialElementState.value
                ? {
                      value: value + guide.slice(value.length),
                      selection,
                  }
                : {value, selection};
        },
        overwriteMode: 'replace',
        removeGuide: removeGuide,
    };
}
