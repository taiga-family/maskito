import type {MaskitoPreprocessor} from '@maskito/core';
import {type PhoneNumber} from 'libphonenumber-js';
import type {CountryCode, MetadataJson} from 'libphonenumber-js/core';
import {parsePhoneNumber} from 'libphonenumber-js/core';

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
}: {
    prefix: string;
    countryIsoCode?: CountryCode;
    metadata: MetadataJson;
}): MaskitoPreprocessor {
    return ({elementState, data}) => {
        const {selection, value} = elementState;

        // handle paste of a number when input is empty
        if (data.length > 2 && value === '') {
            const phone = parsePhone({
                data,
                prefix,
                countryIsoCode,
                metadata,
            });

            const {number} = phone;

            return {
                elementState: {
                    selection,
                    value: '',
                },
                data: number,
            };
        }

        return {elementState};
    };
}
