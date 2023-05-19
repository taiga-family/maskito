import {MASKITO_DEFAULT_OPTIONS, MaskitoOptions} from '@maskito/core';

export function maskitoPostfixPostprocessorGenerator(
    postfix: string,
): NonNullable<MaskitoOptions['postprocessor']> {
    return postfix
        ? ({value, selection}, initialElementState) => {
              if (
                  value.endsWith(postfix) || // already valid
                  (!value && !initialElementState.value.endsWith(postfix)) // cases when developer wants input to be empty
              ) {
                  return {value, selection};
              }

              if (
                  !value.endsWith(postfix) &&
                  !initialElementState.value.endsWith(postfix)
              ) {
                  return {selection, value: value + postfix};
              }

              return {
                  selection,
                  value: Array.from(postfix)
                      .reverse()
                      .reduce((newValue, char, index) => {
                          const i = newValue.length - 1 - index;

                          return newValue[i] !== char
                              ? newValue.slice(0, i + 1) + char + newValue.slice(i + 1)
                              : newValue;
                      }, value),
              };
          }
        : MASKITO_DEFAULT_OPTIONS.postprocessor;
}
