import {MaskitoPreprocessor} from '@maskito/core';
import {
    CountryCode,
    MetadataJson,
    parsePhoneNumber,
    validatePhoneNumberLength,
} from 'libphonenumber-js/core';

export function maskitoValidatePhonePreprocessorGenerator({
    prefix,
    countryIsoCode,
    metadata,
}: {
    prefix: string;
    countryIsoCode: CountryCode;
    metadata: MetadataJson;
}): MaskitoPreprocessor {
    return ({elementState, data}) => {
        const {selection} = elementState;
        const [from] = selection;
        const selectionIncludesPrefix = from < prefix.length;

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
