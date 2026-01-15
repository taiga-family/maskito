import type {MaskitoPreprocessor} from '@maskito/core';
import type {CountryCode, MetadataJson} from 'libphonenumber-js/core';
import {parsePhoneNumber} from 'libphonenumber-js/core';

export function normalizePhonePreprocessorGenerator({
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
        const [from] = selection;
        const selectionIncludesPrefix = from < prefix.length;

        // handle paste of a full phone number when input is empty or contains only the prefix
        if (data.length > 2 && (value === '' || value.trim() === prefix.trim())) {
            // handle paste-event with different code, for example for 8 / +7
            const phone = countryIsoCode
                ? parsePhoneNumber(data, countryIsoCode, metadata)
                : parsePhoneNumber(data, metadata);

            const {nationalNumber, countryCallingCode} = phone;

            return {
                elementState: {
                    selection,
                    value: selectionIncludesPrefix ? '' : prefix,
                },
                data: selectionIncludesPrefix
                    ? `+${countryCallingCode} ${nationalNumber}`
                    : nationalNumber,
            };
        }

        return {elementState};
    };
}
