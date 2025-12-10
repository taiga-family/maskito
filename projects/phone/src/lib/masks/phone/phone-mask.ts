import type {MaskitoOptions} from '@maskito/core';
import type {CountryCode, MetadataJson} from 'libphonenumber-js/core';

import {maskitoPhoneNonStrictOptionsGenerator} from './phone-mask-non-strict';
import {maskitoPhoneStrictOptionsGenerator} from './phone-mask-strict';

/**
 * Phone number format type.
 * - 'INTERNATIONAL': Includes country code prefix (e.g., +1 212 343-3355)
 * - 'NATIONAL': Country-specific format without country code (e.g., (212) 343-3355)
 */
export type PhoneNumberFormat = 'INTERNATIONAL' | 'NATIONAL';

export function maskitoPhoneOptionsGenerator({
    countryIsoCode,
    metadata,
    strict = true,
    separator = '-',
    format = 'INTERNATIONAL',
}: {
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
    format?: PhoneNumberFormat;
}): Required<MaskitoOptions> {
    return strict && countryIsoCode
        ? maskitoPhoneStrictOptionsGenerator({
              countryIsoCode,
              metadata,
              separator,
              format,
          })
        : maskitoPhoneNonStrictOptionsGenerator({
              defaultIsoCode: countryIsoCode,
              metadata,
              separator,
          });
}
