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
    const code = getCountryCallingCode(countryIsoCode, metadata);
    const prefix = `+${code} `;

    return ({elementState, data}) => {
        if (!isInitializationPhase) {
            return {elementState, data};
        }

        const {value, selection} = elementState;

        isInitializationPhase = false;

        /**
         * If the value already starts with the expected prefix (e.g., "+7 "),
         * don't reformat it. This avoids breaking selection positions when
         * the input already has a properly formatted value (e.g., an initial
         * value set on the element before Maskito attaches).
         */
        if (value.startsWith(prefix)) {
            return {elementState};
        }

        try {
            const phone = parsePhoneNumber(value, countryIsoCode, metadata);

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
