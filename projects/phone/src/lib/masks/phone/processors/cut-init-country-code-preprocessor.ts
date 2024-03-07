import type {MaskitoPreprocessor} from '@maskito/core';
import type {CountryCode, MetadataJson} from 'libphonenumber-js/core';
import {getCountryCallingCode, parsePhoneNumber} from 'libphonenumber-js/core';

/**
 * This preprocessor works only once at initialization phase (when `new Maskito(...)` is executed).
 * This preprocessor helps to avoid conflicts during transition from one mask to another (for the same input).
 */
export function cutInitCountryCodePreprocessor({
    countryIsoCode,
    metadata,
}: {
    countryIsoCode: CountryCode;
    metadata: MetadataJson;
}): MaskitoPreprocessor {
    let isInitializationPhase = true;

    return ({elementState, data}) => {
        if (!isInitializationPhase) {
            return {elementState, data};
        }

        const {value, selection} = elementState;

        isInitializationPhase = false;

        try {
            const phone = parsePhoneNumber(value, countryIsoCode, metadata);
            const code = getCountryCallingCode(countryIsoCode, metadata);

            const newValue = `+${code} ${phone.nationalNumber}`;

            return {
                elementState: {
                    value: newValue,
                    selection,
                },
            };
        } catch {
            return {
                elementState,
            };
        }
    };
}
