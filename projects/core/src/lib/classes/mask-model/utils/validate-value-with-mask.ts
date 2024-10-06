import type {MaskitoMaskExpression} from '../../../types';
import {isArray} from '../../../utils';
import {isFixedCharacter} from './is-fixed-character';

export function validateValueWithMask(
    value: string,
    maskExpression: MaskitoMaskExpression,
): boolean {
    if (isArray(maskExpression)) {
        return (
            value.length === maskExpression.length &&
            Array.from(value).every((char, i) => {
                const charConstraint = maskExpression[i] || '';

                return isFixedCharacter(charConstraint)
                    ? char === charConstraint
                    : char.match(charConstraint);
            })
        );
    }

    return maskExpression.test(value);
}
