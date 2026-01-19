import type {MaskitoPreprocessor} from '@maskito/core';
import {
    formatIncompletePhoneNumber,
    getCountryCallingCode,
    parsePhoneNumber,
} from 'libphonenumber-js/core';

import type {MaskitoPhoneParams} from '../phone-mask';

/**
 * This preprocessor works only once at initialization phase (when `new Maskito(...)` is executed).
 * This preprocessor helps to avoid conflicts during transition from one mask to another (for the same input).
 */
export function cutInitCountryCodePreprocessor({
    countryIsoCode,
    metadata,
    format,
}: Required<
    Pick<MaskitoPhoneParams, 'countryIsoCode' | 'format' | 'metadata'>
>): MaskitoPreprocessor {
    let isInitializationPhase = true;
    const code = `+${getCountryCallingCode(countryIsoCode, metadata)} `;

    return ({elementState, data}) => {
        if (!isInitializationPhase) {
            return {elementState, data};
        }

        const {value, selection} = elementState;

        isInitializationPhase = false;

        /**
         * International format:
         * If the value already starts with the expected prefix (e.g., "+7 "),
         * don't reformat it. This avoids breaking selection positions when
         * the input already has a properly formatted value (e.g., an initial
         * value set on the element before Maskito attaches).
         *
         * National format:
         * If value starts with '+', extract national number.
         * Otherwise, assume it's already in national format.
         */
        if (
            (format === 'INTERNATIONAL' && value.startsWith(code)) ||
            (format === 'NATIONAL' && !value.startsWith('+'))
        ) {
            return {elementState};
        }

        try {
            const {nationalNumber} = parsePhoneNumber(value, countryIsoCode, metadata);

            return {
                elementState: {
                    value:
                        format === 'NATIONAL'
                            ? formatIncompletePhoneNumber(
                                  nationalNumber,
                                  countryIsoCode,
                                  metadata,
                              )
                            : `${code} ${nationalNumber}`,
                    selection,
                },
            };
        } catch {
            return {elementState};
        }
    };
}
