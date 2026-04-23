import type {MaskitoOptions} from '@maskito/core';

import {maskitoDateTimeOptionsGenerator} from '../masks/date-time/date-time-mask';
import type {MaskitoDateTimeParams} from '../masks/date-time/date-time-params';
import {getLocaleDateInfo} from './get-locale-date-info';

/**
 * Creates {@link maskitoDateTimeOptionsGenerator} options derived from the given locale.
 * Automatically infers `dateMode` and `dateSeparator` from `Intl.DateTimeFormat`.
 * Defaults to `timeMode: 'HH:MM'`. Any parameter can be overridden via the second argument.
 *
 * @example
 * // US: month/day/year HH:MM — e.g. 12/25/2000, 14:30
 * maskitoLocaleDateTime('en-US');
 *
 * @example
 * // German: day.month.year HH:MM:SS
 * maskitoLocaleDateTime('de-DE', {timeMode: 'HH:MM:SS'});
 */
export function maskitoLocaleDateTime(
    locale: string,
    overrides: Partial<MaskitoDateTimeParams> = {},
): Required<MaskitoOptions> {
    const {mode, separator} = getLocaleDateInfo(locale);

    return maskitoDateTimeOptionsGenerator({
        dateMode: mode,
        timeMode: 'HH:MM',
        dateSeparator: separator,
        ...overrides,
    });
}
