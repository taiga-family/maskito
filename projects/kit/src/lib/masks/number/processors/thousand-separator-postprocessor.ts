import type {MaskitoPostprocessor} from '@maskito/core';

import {identity} from '../../../utils';
import type {MaskitoNumberParams} from '../number-params';
import {fromNumberParts, toNumberParts} from '../utils';

/**
 * It adds symbol for separating thousands.
 * @example 1000000 => (thousandSeparator is equal to space) => 1 000 000.
 */
export function createThousandSeparatorPostprocessor(
    params: Pick<
        Required<MaskitoNumberParams>,
        | 'decimalPseudoSeparators'
        | 'decimalSeparator'
        | 'minusPseudoSigns'
        | 'minusSign'
        | 'postfix'
        | 'prefix'
        | 'thousandSeparator'
    >,
): MaskitoPostprocessor {
    const {thousandSeparator} = params;

    if (!thousandSeparator) {
        return identity;
    }

    const isAllSpaces = (...chars: string[]): boolean => chars.every((x) => /\s/.test(x));

    return ({value, selection}) => {
        const [initialFrom, initialTo] = selection;
        let [from, to] = selection;

        const {prefix, minus, integerPart, decimalSeparator, decimalPart, postfix} =
            toNumberParts(value, params);
        const deletedChars =
            fromNumberParts({minus, integerPart, decimalSeparator, decimalPart}, params)
                .length -
            (
                minus +
                integerPart +
                (decimalSeparator ? decimalSeparator + decimalPart : '')
            ).length;

        if (deletedChars > 0 && initialFrom && initialFrom <= deletedChars) {
            from -= deletedChars;
        }

        if (deletedChars > 0 && initialTo && initialTo <= deletedChars) {
            to -= deletedChars;
        }

        const processedIntegerPart = Array.from(integerPart).reduceRight(
            (formattedValuePart, char, i) => {
                const isLeadingThousandSeparator = !i && char === thousandSeparator;
                const isPositionForSeparator =
                    !isLeadingThousandSeparator &&
                    Boolean(formattedValuePart.length) &&
                    (formattedValuePart.length + 1) % 4 === 0;
                const isSeparator =
                    char === thousandSeparator || isAllSpaces(char, thousandSeparator);

                if (isPositionForSeparator && isSeparator) {
                    return thousandSeparator + formattedValuePart;
                }

                if (!isPositionForSeparator && isSeparator) {
                    if (from && i <= initialFrom) {
                        from--;
                    }

                    if (to && i <= initialTo) {
                        to--;
                    }

                    return formattedValuePart;
                }

                if (!isPositionForSeparator) {
                    return char + formattedValuePart;
                }

                if (i < initialFrom) {
                    from++;
                }

                if (i < initialTo) {
                    to++;
                }

                return char + thousandSeparator + formattedValuePart;
            },
            '',
        );

        return {
            value: fromNumberParts(
                {
                    prefix,
                    minus,
                    integerPart: processedIntegerPart,
                    decimalSeparator,
                    decimalPart,
                    postfix,
                },
                params,
            ),
            selection: [from, to],
        };
    };
}
