import type {MaskitoPreprocessor} from '@maskito/core';

import {escapeRegExp, extractAffixes, identity} from '../../../utils';

/**
 * It drops decimal part if `maximumFractionDigits` is zero.
 * @example User pastes '123.45' (but `maximumFractionDigits` is zero) => 123
 */
export function createZeroPrecisionPreprocessor({
    maximumFractionDigits,
    decimalSeparator,
    prefix,
    postfix,
}: {
    maximumFractionDigits: number;
    decimalSeparator: string;
    prefix: string;
    postfix: string;
}): MaskitoPreprocessor {
    if (
        maximumFractionDigits > 0 ||
        !decimalSeparator // all separators should be treated only as thousand separators
    ) {
        return identity;
    }

    const decimalPartRegExp = new RegExp(`${escapeRegExp(decimalSeparator)}.*$`, 'g');

    return ({elementState, data}) => {
        const {value, selection} = elementState;
        const {cleanValue, extractedPrefix, extractedPostfix} = extractAffixes(value, {
            prefix,
            postfix,
        });
        const [from, to] = selection;
        const newValue =
            extractedPrefix +
            cleanValue.replace(decimalPartRegExp, '') +
            extractedPostfix;

        return {
            elementState: {
                selection: [
                    Math.min(from, newValue.length),
                    Math.min(to, newValue.length),
                ],
                value: newValue,
            },
            data: data.replace(decimalPartRegExp, ''),
        };
    };
}
