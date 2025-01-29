import type {MaskitoPostprocessor} from '@maskito/core';

import {extractAffixes, identity} from '../../../utils';
import {toNumberParts} from '../utils';

/**
 * It adds symbol for separating thousands.
 * @example 1000000 => (thousandSeparator is equal to space) => 1 000 000.
 */
export function createThousandSeparatorPostprocessor({
    thousandSeparator,
    decimalSeparator,
    prefix,
    postfix,
    minusSign,
}: {
    thousandSeparator: string;
    decimalSeparator: string;
    prefix: string;
    postfix: string;
    minusSign: string;
}): MaskitoPostprocessor {
    if (!thousandSeparator) {
        return identity;
    }

    const isAllSpaces = (...chars: string[]): boolean => chars.every((x) => /\s/.test(x));

    return ({value, selection}) => {
        const [initialFrom, initialTo] = selection;
        let [from, to] = selection;

        const {cleanValue, extractedPostfix, extractedPrefix} = extractAffixes(value, {
            prefix,
            postfix,
        });

        const {minus, integerPart, decimalPart} = toNumberParts(cleanValue, {
            decimalSeparator,
            minusSign,
        });
        const hasDecimalSeparator =
            decimalSeparator && cleanValue.includes(decimalSeparator);
        const deletedChars =
            cleanValue.length -
            (
                minus +
                integerPart +
                (hasDecimalSeparator ? decimalSeparator + decimalPart : '')
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
                    if (i && i <= initialFrom) {
                        from--;
                    }

                    if (i && i <= initialTo) {
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
            value:
                extractedPrefix +
                minus +
                processedIntegerPart +
                (hasDecimalSeparator ? decimalSeparator : '') +
                decimalPart +
                extractedPostfix,
            selection: [from, to],
        };
    };
}
