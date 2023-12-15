import {MaskitoPostprocessor} from '@maskito/core';

import {identity} from '../utils';

export function maskitoPrefixPostprocessorGenerator(
    prefix: string,
): MaskitoPostprocessor {
    return prefix
        ? ({value, selection}) => {
              if (value.startsWith(prefix)) {
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
