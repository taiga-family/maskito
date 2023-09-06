import {MaskitoPreprocessor} from '@maskito/core';
import {
    AsYouType,
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
    countryIsoCode?: CountryCode;
    metadata: MetadataJson;
}): MaskitoPreprocessor {
    return ({elementState, data}) => {
        const {selection, value} = elementState;
        const [from] = selection;
        const selectionIncludesPrefix = from < prefix.length;
        const cleanCode = prefix.trim();

        // handling autocomplete
        if (value && !value.startsWith(cleanCode) && !data) {
            const formatter = new AsYouType({defaultCountry: countryIsoCode}, metadata);

            formatter.input(value);
            const numberValue = formatter.getNumberValue() || '';

            formatter.reset();

            return {elementState: {value: formatter.input(numberValue), selection}};
        }

        try {
            const validationError = validatePhoneNumberLength(
                data,
                {defaultCountry: countryIsoCode},
                metadata,
            );

            if (!validationError) {
                // handle past-event with different code, for example for 8 / +7
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
