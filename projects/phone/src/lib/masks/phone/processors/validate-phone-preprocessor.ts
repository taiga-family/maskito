import {MaskitoPreprocessor} from '@maskito/core';
import {
    CountryCode,
    MetadataJson,
    parsePhoneNumber,
    validatePhoneNumberLength,
} from 'libphonenumber-js/core';

export function validatePhonePreprocessorGenerator({
    prefix,
    countryIsoCode,
    metadata,
}: {
    prefix: string;
    countryIsoCode: CountryCode;
    metadata: MetadataJson;
}): MaskitoPreprocessor {
    return ({elementState, data}) => {
        const {selection, value} = elementState;
        const [from] = selection;
        const selectionIncludesPrefix = from < prefix.length;
        const cleanCode = prefix.trim();

        // handling autocomplete
        if (value && !value.startsWith(cleanCode) && !data) {
            return {elementState: {value: prefix + value, selection}};
        }

        try {
            const validationError = validatePhoneNumberLength(
                data,
                countryIsoCode,
                metadata,
            );

            if (!validationError) {
                // handle past-event with different code, for example for 8 / +7
                const phone = parsePhoneNumber(data, countryIsoCode, metadata);
                const nationalSignificantNumber = phone.nationalNumber;

                return {
                    elementState: {
                        selection,
                        value: selectionIncludesPrefix ? '' : prefix,
                    },
                    data: selectionIncludesPrefix
                        ? `${prefix}${nationalSignificantNumber}`
                        : nationalSignificantNumber,
                };
            }
        } catch {
            return {elementState};
        }

        return {elementState};
    };
}
