import type {MaskitoPostprocessor} from '@maskito/core';

import {escapeRegExp, findCommonBeginningSubstr, identity} from '../utils';

export function maskitoPostfixPostprocessorGenerator(
    postfix: string,
): MaskitoPostprocessor {
    const completedPostfixRE = new RegExp(`${escapeRegExp(postfix)}$`);
    const incompletePostfixRE = new RegExp(
        postfix &&
            `(${postfix
                .split('')
                .map(escapeRegExp)
                // eslint-disable-next-line
                .reduce((acc, _, i, arr) => `${acc}|${arr.slice(0, i + 1).join('')}`)})$`,
    );

    return postfix
        ? ({value, selection}, initialElementState) => {
              if (!value && !initialElementState.value.endsWith(postfix)) {
                  // cases when developer wants input to be empty (programmatically)
                  return {value, selection};
              }

              if (
                  !value.match(incompletePostfixRE) &&
                  !initialElementState.value.endsWith(postfix)
              ) {
                  return {selection, value: value + postfix};
              }

              const initialValueBeforePostfix = initialElementState.value.replace(
                  completedPostfixRE,
                  '',
              );
              const postfixWasModified =
                  initialElementState.selection[1] > initialValueBeforePostfix.length;
              const alreadyExistedValueBeforePostfix = findCommonBeginningSubstr(
                  initialValueBeforePostfix,
                  value,
              );

              return {
                  selection,
                  value: Array.from(postfix)
                      .reverse()
                      .reduce((newValue, char, index) => {
                          const i = newValue.length - 1 - index;
                          const isInitiallyMirroredChar =
                              alreadyExistedValueBeforePostfix[i] === char &&
                              postfixWasModified;

                          return newValue[i] !== char || isInitiallyMirroredChar
                              ? newValue.slice(0, i + 1) + char + newValue.slice(i + 1)
                              : newValue;
                      }, value),
              };
          }
        : identity;
}
