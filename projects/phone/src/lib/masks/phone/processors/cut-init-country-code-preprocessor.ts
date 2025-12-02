import type {MaskitoPreprocessor} from '@maskito/core';
import type {CountryCode, MetadataJson} from 'libphonenumber-js/core';
import {AsYouType, getCountryCallingCode, parsePhoneNumber} from 'libphonenumber-js/core';

import type {MaskitoPhoneFormat} from '../types';

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
    format?: MaskitoPhoneFormat;
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
            const isNational = format === 'NATIONAL';

            if (isNational) {
                // For national format, format using the national formatter
                const formatter = new AsYouType(countryIsoCode, metadata);

                formatter.input(phone.nationalNumber);
                const formattedNational = formatter.getNumber()?.formatNational() ?? '';

                formatter.reset();

                return {
                    elementState: {
                        value: formattedNational,
                        selection,
                    },
                };
            }

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
