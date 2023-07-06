import {MaskitoPostprocessor} from '@maskito/core';

import {escapeRegExp, identity} from '../utils';

export function maskitoPostfixPostprocessorGenerator(
    postfix: string,
): MaskitoPostprocessor {
    return postfix
        ? ({value, selection}, initialElementState) => {
              if (!value && !initialElementState.value.endsWith(postfix)) {
                  // cases when developer wants input to be empty
                  return {value, selection};
              }

              if (
                  !value.endsWith(postfix) &&
                  !initialElementState.value.endsWith(postfix)
              ) {
                  return {selection, value: value + postfix};
              }

              const initialValueBeforePostfix = initialElementState.value.replace(
                  new RegExp(`${escapeRegExp(postfix)}$`),
                  '',
              );
              const untouchedPart = getUntouched(initialValueBeforePostfix, value);

              return {
                  selection,
                  value: Array.from(postfix)
                      .reverse()
                      .reduce((newValue, char, index) => {
                          const i = newValue.length - 1 - index;

                          return newValue[i] !== char || untouchedPart[i] === char
                              ? newValue.slice(0, i + 1) + char + newValue.slice(i + 1)
                              : newValue;
                      }, value),
              };
          }
        : identity;
}

function getUntouched(initial: string, now: string): string {
    let res = '';

    for (let i = 0; i < now.length; i++) {
        if (now[i] !== initial[i]) {
            return res;
        }

        res += now[i];
    }

    return res;
}
