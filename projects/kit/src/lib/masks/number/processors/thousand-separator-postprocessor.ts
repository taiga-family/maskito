import type {MaskitoPostprocessor} from '@maskito/core';

import {clamp, extractAffixes, identity} from '../../../utils';
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
}: {
    thousandSeparator: string;
    decimalSeparator: string;
    prefix: string;
    postfix: string;
}): MaskitoPostprocessor {
    if (!thousandSeparator) {
        return identity;
    }

    const isAllSpaces = (...chars: string[]): boolean => chars.every((x) => /\s/.test(x));

    return (elementState) => {
        const [initialFrom, initialTo] = elementState.selection;
        const {value, selection} = trimState(elementState, thousandSeparator);
        let [from, to] = selection;

        const {cleanValue, extractedPostfix, extractedPrefix} = extractAffixes(value, {
            prefix,
            postfix,
        });
        const {minus, integerPart, decimalPart} = toNumberParts(cleanValue, {
            decimalSeparator,
            thousandSeparator,
        });

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

                if (i <= initialFrom) {
                    from++;
                }

                if (i <= initialTo) {
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
                (cleanValue.includes(decimalSeparator) ? decimalSeparator : '') +
                decimalPart +
                extractedPostfix,
            selection: [from, to],
        };
    };
}

function trimState(
    {
        value,
        selection,
    }: {
        value: string;
        selection: readonly [number, number];
    },
    trimChar: string,
): {value: string; selection: readonly [number, number]} {
    const trimCharRE = trimChar.replaceAll(/\s/g, String.raw`\s`);
    const leadingThousandSepatorsRE = new RegExp(`^${trimCharRE}*`);
    const trailingThousandSepatorsRE = new RegExp(`${trimCharRE}*$`);

    const [from, to] = selection;
    const cleanValue = value
        .replace(leadingThousandSepatorsRE, '')
        .replace(trailingThousandSepatorsRE, '');
    const [deletedLeadingCharacters = ''] = value.match(leadingThousandSepatorsRE) || [];

    return {
        value: cleanValue,
        selection: [
            clamp(from - deletedLeadingCharacters.length, 0, cleanValue.length),
            clamp(to - deletedLeadingCharacters.length, 0, cleanValue.length),
        ],
    };
}
