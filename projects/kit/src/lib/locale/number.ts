import type {MaskitoOptions} from '@maskito/core';

import {maskitoNumberOptionsGenerator} from '../masks/number/number-mask';
import type {MaskitoNumberParams} from '../masks/number/number-params';
import {getLocaleNumberSeparators} from './get-locale-number-separators';

/**
 * Creates {@link maskitoNumberOptionsGenerator} options derived from the given locale.
 * Automatically infers `thousandSeparator`, `decimalSeparator`, and `thousandSeparatorPattern`
 * from `Intl.NumberFormat`. Any parameter can be overridden via the second argument.
 *
 * @example
 * // German: dot-separated thousands, comma decimal — e.g. 1.234,56
 * maskitoLocaleNumber('de-DE', {maximumFractionDigits: 2});
 *
 * @example
 * // Indian: 2-2-3 grouping — e.g. ₹12,34,567
 * maskitoLocaleNumber('en-IN', {prefix: '₹'});
 */
export function maskitoLocaleNumber(
    locale: string,
    overrides: MaskitoNumberParams = {},
): Required<MaskitoOptions> {
    const {thousandSeparator, decimalSeparator, thousandSeparatorPattern} =
        getLocaleNumberSeparators(locale);

    return maskitoNumberOptionsGenerator({
        thousandSeparator,
        decimalSeparator,
        thousandSeparatorPattern,
        ...overrides,
    });
}
