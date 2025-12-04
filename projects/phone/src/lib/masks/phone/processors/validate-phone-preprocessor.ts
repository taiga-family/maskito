import type {MaskitoPreprocessor} from '@maskito/core';
import type {CountryCode, MetadataJson} from 'libphonenumber-js/core';
import {
    AsYouType,
    parsePhoneNumber,
    validatePhoneNumberLength,
} from 'libphonenumber-js/core';

import type {MaskitoPhoneFormat} from '../types';

export function validatePhonePreprocessorGenerator({
    prefix,
    countryIsoCode,
    metadata,
    format = 'INTERNATIONAL',
}: {
    prefix: string;
    countryIsoCode?: CountryCode;
    metadata: MetadataJson;
    format?: MaskitoPhoneFormat;
}): MaskitoPreprocessor {
    const isNational = format === 'NATIONAL';

    return ({elementState, data}, actionType) => {
        const {selection, value} = elementState;
        const [from] = selection;
        const selectionIncludesPrefix = !isNational && from < prefix.length;
        const cleanCode = prefix.trim();
        const isDeleting =
            actionType === 'deleteBackward' || actionType === 'deleteForward';

        // handling autocomplete
        if (value && !isNational && !value.startsWith(cleanCode) && !data) {
            const formatter = new AsYouType({defaultCountry: countryIsoCode}, metadata);

            formatter.input(value);
            const numberValue = formatter.getNumberValue() ?? '';

            formatter.reset();

            return {elementState: {value: formatter.input(numberValue), selection}};
        }

        // For national format, handle autocomplete differently
        // Skip this during deletion to allow normal backspace/delete behavior
        if (value && isNational && !data && !isDeleting) {
            const formatter = new AsYouType(countryIsoCode, metadata);
            const digitsOnly = value.replaceAll(/\D/g, '');

            formatter.input(digitsOnly);
            const phoneNumber = formatter.getNumber();

            if (phoneNumber) {
                const formattedNational = phoneNumber.formatNational();

                formatter.reset();

                return {elementState: {value: formattedNational, selection}};
            }

            formatter.reset();
        }

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

                if (isNational) {
                    // For national format, return only the national number formatted
                    const formatter = new AsYouType(countryIsoCode, metadata);

                    formatter.input(nationalNumber);
                    const phoneNumber = formatter.getNumber();
                    const formattedNational = phoneNumber?.formatNational() ?? '';

                    formatter.reset();

                    return {
                        elementState: {
                            selection,
                            value: '',
                        },
                        data: formattedNational || nationalNumber,
                    };
                }

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
