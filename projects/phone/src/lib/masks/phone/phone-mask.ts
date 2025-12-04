import type {MaskitoOptions} from '@maskito/core';
import type {CountryCode, MetadataJson} from 'libphonenumber-js/core';

import {maskitoPhoneNonStrictOptionsGenerator} from './phone-mask-non-strict';
import {maskitoPhoneStrictOptionsGenerator} from './phone-mask-strict';
import type {MaskitoPhoneFormat} from './types';

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
    format?: MaskitoPhoneFormat;
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
