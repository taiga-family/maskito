import type {MaskitoOptions} from '@maskito/core';
import type {CountryCode, MetadataJson} from 'libphonenumber-js/core';

import {maskitoPhoneNonStrictOptionsGenerator} from './phone-mask-non-strict';
import {maskitoPhoneStrictOptionsGenerator} from './phone-mask-strict';

export function maskitoPhoneOptionsGenerator({
    countryIsoCode,
    metadata,
    strict = true,
    separator = '-',
}: {
    countryIsoCode?: CountryCode;
    metadata: MetadataJson;
    strict?: boolean;
    separator?: string;
}): Required<MaskitoOptions> {
    return strict && countryIsoCode
        ? maskitoPhoneStrictOptionsGenerator({countryIsoCode, metadata, separator})
        : maskitoPhoneNonStrictOptionsGenerator({
              defaultIsoCode: countryIsoCode,
              metadata,
              separator,
          });
}
