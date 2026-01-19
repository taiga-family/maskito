import type {MaskitoPreprocessor} from '@maskito/core';
import type {CountryCode, MetadataJson} from 'libphonenumber-js/core';
import {AsYouType} from 'libphonenumber-js/core';

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
        const cleanCode = prefix.trim();

        // handling autocomplete
        if (value && !value.startsWith(cleanCode) && !data) {
            const formatter = new AsYouType({defaultCountry: countryIsoCode}, metadata);

            formatter.input(value);
            const numberValue = formatter.getNumberValue() ?? '';

            formatter.reset();

            return {elementState: {value: formatter.input(numberValue), selection}};
        }

        return {elementState};
    };
}
