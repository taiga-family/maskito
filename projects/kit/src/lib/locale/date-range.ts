import type {MaskitoOptions} from '@maskito/core';

import {maskitoDateRangeOptionsGenerator} from '../masks/date-range/date-range-mask';
import type {MaskitoDateMode, MaskitoDateSegments} from '../types';
import {getLocaleDateInfo} from './get-locale-date-info';

interface MaskitoDateRangeParams {
    mode: MaskitoDateMode;
    min?: Date;
    max?: Date;
    minLength?: Partial<MaskitoDateSegments<number>>;
    maxLength?: Partial<MaskitoDateSegments<number>>;
    dateSeparator?: string;
    rangeSeparator?: string;
}

/**
 * Creates {@link maskitoDateRangeOptionsGenerator} options derived from the given locale.
 * Automatically infers `mode` and `dateSeparator` from `Intl.DateTimeFormat`.
 * Any parameter can be overridden via the second argument.
 *
 * @example
 * // US: month/day/year range — e.g. 12/25/2000 – 01/01/2001
 * maskitoLocaleDateRange('en-US');
 *
 * @example
 * // German: day.month.year range — e.g. 25.12.2000 – 01.01.2001
 * maskitoLocaleDateRange('de-DE');
 */
export function maskitoLocaleDateRange(
    locale: string,
    overrides: Partial<MaskitoDateRangeParams> = {},
): Required<MaskitoOptions> {
    const {mode, separator} = getLocaleDateInfo(locale);

    return maskitoDateRangeOptionsGenerator({
        mode,
        dateSeparator: separator,
        ...overrides,
    });
}
