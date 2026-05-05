import type {MaskitoMaskExpression} from '../../../types';
import {isFixedCharacter} from './is-fixed-character';

export function validateValueWithMask(
    value: string,
    maskExpression: MaskitoMaskExpression,
): boolean {
    return Array.isArray(maskExpression)
        ? value.length === maskExpression.length &&
              Array.from(value).every((char, i) => {
                  const charConstraint = maskExpression[i] || '';

                  return isFixedCharacter(charConstraint)
                      ? char === charConstraint
                      : char.match(charConstraint);
              })
        : maskExpression.test(value);
}
