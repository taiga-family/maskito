import {MaskitoPostprocessor} from '@maskito/core';

import {CHAR_MINUS} from '../../../constants';
import {escapeRegExp} from '../../../utils';

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
        return elementState => elementState;
    }

    const prefixReg = new RegExp(`^${escapeRegExp(prefix)}${CHAR_MINUS}?`);
    const postfixReg = new RegExp(`${escapeRegExp(postfix)}$`);

    return ({value, selection}) => {
        const [integerPart, decimalPart = ''] = value.split(decimalSeparator);
        const [initialFrom, initialTo] = selection;
        let [from, to] = selection;

        const cleanIntegerPart = integerPart
            .replace(prefixReg, '')
            .replace(postfixReg, '');
        const [integerPartPrefix = ''] = integerPart.match(prefixReg) || [];
        const [integerPartPostfix = ''] = integerPart.match(postfixReg) || [];
        const processedIntegerPart = Array.from(cleanIntegerPart).reduceRight(
            (formattedValuePart, char, i) => {
                const isLeadingThousandSeparator = !i && char === thousandSeparator;
                const isPositionForSeparator =
                    !isLeadingThousandSeparator &&
                    formattedValuePart.length &&
                    (formattedValuePart.length + 1) % 4 === 0;

                if (char === thousandSeparator && isPositionForSeparator) {
                    return char + formattedValuePart;
                }

                if (char === thousandSeparator && !isPositionForSeparator) {
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
                integerPartPrefix +
                processedIntegerPart +
                integerPartPostfix +
                (value.includes(decimalSeparator) ? decimalSeparator : '') +
                decimalPart,
            selection: [from, to],
        };
    };
}
