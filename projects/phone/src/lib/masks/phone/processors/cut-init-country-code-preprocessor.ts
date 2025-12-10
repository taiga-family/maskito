import type {MaskitoPreprocessor} from '@maskito/core';
import type {CountryCode, MetadataJson} from 'libphonenumber-js/core';
import {
    formatIncompletePhoneNumber,
    getCountryCallingCode,
    parsePhoneNumber,
} from 'libphonenumber-js/core';

import type {PhoneNumberFormat} from '../phone-mask';

/**
 * This preprocessor works only once at initialization phase (when `new Maskito(...)` is executed).
 * This preprocessor helps to avoid conflicts during transition from one mask to another (for the same input).
 */
export function cutInitCountryCodePreprocessor({
    countryIsoCode,
    metadata,
    format = 'INTERNATIONAL',
}: {
    countryIsoCode: CountryCode;
    metadata: MetadataJson;
    /**
     * Phone number format.
     * - 'INTERNATIONAL' (default): Includes country code prefix
     * - 'NATIONAL': Country-specific format without country code
     */
    format?: PhoneNumberFormat;
}): MaskitoPreprocessor {
    let isInitializationPhase = true;
    const isNational = format === 'NATIONAL';
    const code = `+${getCountryCallingCode(countryIsoCode, metadata)} `;

    return ({elementState, data}) => {
        if (!isInitializationPhase) {
            return {elementState, data};
        }

        const {value, selection} = elementState;

        isInitializationPhase = false;

        /**
         * For national format, check if value is already in national format
         * (doesn't start with '+').
         */
        if (isNational) {
            /**
             * If value starts with '+', extract national number.
             * Otherwise, assume it's already in national format.
             */
            if (value.startsWith('+')) {
                try {
                    const {nationalNumber} = parsePhoneNumber(
                        value,
                        countryIsoCode,
                        metadata,
                    );
                    /**
                     * Format the national number using country-specific formatting.
                     */
                    const formattedNational = formatIncompletePhoneNumber(
                        nationalNumber,
                        countryIsoCode,
                        metadata,
                    );

                    return {
                        elementState: {
                            value: formattedNational,
                            selection,
                        },
                    };
                } catch {
                    return {elementState};
                }
            }

            return {elementState};
        }

        /**
         * International format: If the value already starts with the expected prefix (e.g., "+7 "),
         * don't reformat it. This avoids breaking selection positions when
         * the input already has a properly formatted value (e.g., an initial
         * value set on the element before Maskito attaches).
         */
        if (value.startsWith(code)) {
            return {elementState};
        }

        try {
            const phone = parsePhoneNumber(value, countryIsoCode, metadata);

            const newValue = `${code} ${phone.nationalNumber}`;

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
