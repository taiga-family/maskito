import type {MaskitoOptions} from '@maskito/core';

import {maskitoDateOptionsGenerator} from '../masks/date/date-mask';
import type {MaskitoDateParams} from '../masks/date/date-params';
import {getLocaleDateInfo} from './get-locale-date-info';

/**
 * Creates {@link maskitoDateOptionsGenerator} options derived from the given locale.
 * Automatically infers `mode` and `separator` from `Intl.DateTimeFormat`.
 * Any parameter can be overridden via the second argument.
 *
 * @example
 * // US: month/day/year — e.g. 12/25/2000
 * maskitoLocaleDate('en-US');
 *
 * @example
 * // German: day.month.year — e.g. 25.12.2000
 * maskitoLocaleDate('de-DE', {min: new Date(2000, 0, 1)});
 */
export function maskitoLocaleDate(
    locale: string,
    overrides: Partial<MaskitoDateParams> = {},
): Required<MaskitoOptions> {
    const {mode, separator} = getLocaleDateInfo(locale);

    return maskitoDateOptionsGenerator({mode, separator, ...overrides});
}
