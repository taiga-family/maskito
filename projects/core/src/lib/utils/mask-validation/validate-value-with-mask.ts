import {MaskExpression} from '../../types';

export function validateValueWithMask(
    value: string,
    maskExpression: MaskExpression,
): boolean {
    if (Array.isArray(maskExpression)) {
        return (
            value.length <= maskExpression.length &&
            Array.from(value).every((char, i) => {
                const charConstraint = maskExpression[i];

                return typeof charConstraint === 'string'
                    ? char === charConstraint
                    : char.match(charConstraint);
            })
        );
    }

    return maskExpression.test(value);
}
