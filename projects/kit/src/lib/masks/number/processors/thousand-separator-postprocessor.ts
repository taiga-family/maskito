import type {MaskitoPostprocessor} from '@maskito/core';

import {identity} from '../../../utils';
import type {MaskitoNumberParams} from '../number-params';
import {fromNumberParts, toNumberParts} from '../utils';

const SPACE_REG = /\s/;
const SPACE_GLOBAL_REG = /\s/g;

/**
 * It adds symbol for separating thousands.
 * @example 1000000 => (thousandSeparator is equal to space) => 1 000 000.
 */
export function createThousandSeparatorPostprocessor(
    params: Pick<
        Required<MaskitoNumberParams>,
        | 'decimalPseudoSeparators'
        | 'decimalSeparator'
        | 'maximumFractionDigits'
        | 'minusPseudoSigns'
        | 'minusSign'
        | 'negativePattern'
        | 'postfix'
        | 'prefix'
        | 'thousandSeparator'
        | 'thousandSeparatorPattern'
    >,
): MaskitoPostprocessor {
    const {thousandSeparator, thousandSeparatorPattern} = params;

    if (!thousandSeparator) {
        return identity;
    }

    const isSeparatorWhitespace = SPACE_REG.test(thousandSeparator);
    const isSeparator = isSeparatorWhitespace
        ? (char: string): boolean => SPACE_REG.test(char)
        : (char: string): boolean => char === thousandSeparator;
    const stripSeparators = isSeparatorWhitespace
        ? (str: string): string => str.replaceAll(SPACE_GLOBAL_REG, '')
        : (str: string): string => str.replaceAll(thousandSeparator, '');

    return ({value, selection}) => {
        const [initialFrom, initialTo] = selection;
        let [from, to] = selection;

        const {prefix, minus, integerPart, decimalSeparator, decimalPart, postfix} =
            toNumberParts(value, params);
        const rawLength = (
            minus +
            integerPart +
            (decimalSeparator ? decimalSeparator + decimalPart : '')
        ).length;
        const normalizedLength = fromNumberParts(
            {minus, integerPart, decimalSeparator, decimalPart},
            params,
        ).length;
        const deletedChars = normalizedLength - rawLength;

        if (deletedChars > 0 && initialFrom && initialFrom <= deletedChars) {
            from -= deletedChars;
        }

        if (deletedChars > 0 && initialTo && initialTo <= deletedChars) {
            to -= deletedChars;
        }

        const integerStart = prefix.length + minus.length;

        const groups = thousandSeparatorPattern(stripSeparators(integerPart));
        const digitAt: number[] = [];
        let pos = 0;

        for (const [i, group] of groups.entries()) {
            if (i > 0) {
                pos += thousandSeparator.length;
            }

            for (let j = 0; j < group.length; j++) {
                digitAt.push(pos + j);
            }

            pos += group.length;
        }

        const formatted = groups.join(thousandSeparator);

        const mapCursor = (cursor: number): number => {
            const offset = cursor - integerStart;

            if (offset <= 0) {
                return cursor;
            }

            if (offset >= integerPart.length) {
                return cursor + formatted.length - integerPart.length;
            }

            const digitCount = stripSeparators(integerPart.slice(0, offset)).length;
            const prevWasSep = isSeparator(integerPart.charAt(offset - 1));

            if (prevWasSep) {
                return integerStart + (digitAt[digitCount] ?? formatted.length);
            }

            return integerStart + (digitAt[digitCount - 1] ?? -1) + 1;
        };

        return {
            value: fromNumberParts(
                {
                    prefix,
                    minus,
                    integerPart: formatted,
                    decimalSeparator,
                    decimalPart,
                    postfix,
                },
                params,
            ),
            selection: [mapCursor(from), mapCursor(to)],
        };
    };
}
