import type {MaskitoPostprocessor} from '@maskito/core';

import {identity} from '../utils';

export function maskitoPrefixPostprocessorGenerator(
    prefix: string,
): MaskitoPostprocessor {
    return prefix
        ? ({value, selection}, initialElementState) => {
              if (
                  value.startsWith(prefix) || // already valid
                  (!value && !initialElementState.value.startsWith(prefix)) // cases when developer wants input to be empty
              ) {
                  return {value, selection};
              }

              const [from, to] = selection;
              const prefixedValue = Array.from(prefix).reduce(
                  (modifiedValue, char, i) =>
                      modifiedValue[i] === char
                          ? modifiedValue
                          : modifiedValue.slice(0, i) + char + modifiedValue.slice(i),
                  value,
              );
              const addedCharsCount = prefixedValue.length - value.length;

              return {
                  selection: [from + addedCharsCount, to + addedCharsCount],
                  value: prefixedValue,
              };
          }
        : identity;
}
