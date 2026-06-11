import type {MaskitoOptions} from '@maskito/core';
import type {CountryCode, MetadataJson, NumberFormat} from 'libphonenumber-js/core';

import {maskitoPhoneNonStrict} from './phone-mask-non-strict';
import {maskitoPhoneStrict} from './phone-mask-strict';

export interface MaskitoPhoneParams {
    countryIsoCode?: CountryCode;
    metadata: MetadataJson;
    strict?: boolean;
    separator?: string;
    /**
     * Phone number format.
     * - 'INTERNATIONAL' (default): Includes country code prefix (e.g., +1 212 343-3355)
     * - 'NATIONAL': Country-specific format without country code (e.g., (212) 343-3355).
     *   Only works with strict mode (requires countryIsoCode).
     */
    format?: Extract<NumberFormat, 'INTERNATIONAL' | 'NATIONAL'>;
}

export function maskitoPhone({
    countryIsoCode,
    metadata,
    strict = true,
    separator = '-',
    format = 'INTERNATIONAL',
}: MaskitoPhoneParams): Required<MaskitoOptions> {
    return strict && countryIsoCode
        ? maskitoPhoneStrict({
              countryIsoCode,
              metadata,
              separator,
              format,
          })
        : maskitoPhoneNonStrict({
              defaultIsoCode: countryIsoCode,
              metadata,
              separator,
          });
}

export {
    /**
     * @deprecated Use {@link maskitoPhone} instead.
     */
    maskitoPhone as maskitoPhoneOptionsGenerator,
};
