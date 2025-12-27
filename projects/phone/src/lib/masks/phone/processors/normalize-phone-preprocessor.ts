import type {MaskitoPreprocessor} from '@maskito/core';
import type {CountryCode, MetadataJson} from 'libphonenumber-js/core';
import {parsePhoneNumber, validatePhoneNumberLength} from 'libphonenumber-js/core';

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
        const {selection} = elementState;
        const [from] = selection;
        const selectionIncludesPrefix = from < prefix.length;

        try {
            const validationError = validatePhoneNumberLength(
                data,
                {defaultCountry: countryIsoCode},
                metadata,
            );

            if (!validationError || validationError === 'TOO_SHORT') {
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
        } catch {
            return {elementState};
        }

        return {elementState};
    };
}
