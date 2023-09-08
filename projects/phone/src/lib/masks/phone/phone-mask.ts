import {MaskitoOptions} from '@maskito/core';
import {CountryCode, MetadataJson} from 'libphonenumber-js/core';

import {maskitoPhoneNonStrictOptionsGenerator} from './phone-mask-non-strict';
import {maskitoPhoneStrictOptionsGenerator} from './phone-mask-strict';

export function maskitoPhoneOptionsGenerator({
    countryIsoCode,
    metadata,
    strict = true,
}: {
    countryIsoCode?: CountryCode;
    metadata: MetadataJson;
    strict?: boolean;
}): Required<MaskitoOptions> {
    return strict && countryIsoCode
        ? maskitoPhoneStrictOptionsGenerator({countryIsoCode, metadata})
        : maskitoPhoneNonStrictOptionsGenerator({
              defaultIsoCode: countryIsoCode,
              metadata,
          });
}
