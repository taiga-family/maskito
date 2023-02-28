import {MaskitoOptions} from '@maskito/core';

import {CHAR_MINUS} from '../../../constants';

/**
 * It adds symbol for separating thousands.
 * @example 1000000 => (thousandSeparator is equal to space) => 1 000 000.
 */
export function createThousandSeparatorPostprocessor({
    thousandSeparator,
    decimalSeparator,
}: {
    thousandSeparator: string;
    decimalSeparator: string;
}): NonNullable<MaskitoOptions['postprocessor']> {
    return ({value, selection}) => {
        const [integerPart, decimalPart = ''] = value.split(decimalSeparator);
        const [initialFrom, initialTo] = selection;
        let [from, to] = selection;

        const processedIntegerPart = Array.from(
            integerPart.replace(new RegExp(`^\\${CHAR_MINUS}`), ''),
        ).reduceRight((formattedValuePart, char, i) => {
            const isPositionForSeparator =
                formattedValuePart.length && (formattedValuePart.length + 1) % 4 === 0;

            if (char === thousandSeparator && isPositionForSeparator) {
                return char + formattedValuePart;
            }

            if (char === thousandSeparator && !isPositionForSeparator) {
                if (i <= initialFrom) {
                    from--;
                }

                if (i <= initialTo) {
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
        }, '');

        return {
            value:
                (value.startsWith(CHAR_MINUS) ? CHAR_MINUS : '') +
                processedIntegerPart +
                (value.includes(decimalSeparator) ? decimalSeparator : '') +
                decimalPart,
            selection: [from, to],
        };
    };
}
