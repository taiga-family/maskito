import type {MaskitoPreprocessor} from '@maskito/core';
import {type PhoneNumber} from 'libphonenumber-js';
import type {CountryCode, MetadataJson} from 'libphonenumber-js/core';
import {parsePhoneNumber} from 'libphonenumber-js/core';

import {type MaskitoPhoneParams} from '../phone-mask';

function parsePhone({
    data,
    prefix,
    countryIsoCode,
    metadata,
}: {
    data: string;
    prefix: string;
    countryIsoCode?: CountryCode;
    metadata: MetadataJson;
}): PhoneNumber {
    if (!data.startsWith(prefix) && countryIsoCode) {
        try {
            return parsePhoneNumber(`+${data}`, countryIsoCode, metadata);
        } catch {
            return parsePhoneNumber(data, countryIsoCode, metadata);
        }
    }

    return parsePhoneNumber(data, metadata);
}

export function pasteNonStrictPhonePreprocessorGenerator({
    prefix,
    countryIsoCode,
    metadata,
}: Pick<MaskitoPhoneParams, 'countryIsoCode' | 'metadata'> & {
    prefix: string;
}): MaskitoPreprocessor {
    return ({elementState, data}) => {
        return {
            elementState,
            data:
                data.length > 2 && elementState.value === ''
                    ? parsePhone({
                          data,
                          prefix,
                          countryIsoCode,
                          metadata,
                      }).number
                    : data,
        };
    };
}
