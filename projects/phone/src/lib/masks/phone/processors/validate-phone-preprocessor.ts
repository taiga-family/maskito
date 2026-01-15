import type {MaskitoPreprocessor} from '@maskito/core';
import type {CountryCode, MetadataJson} from 'libphonenumber-js/core';
import {
    AsYouType,
    formatIncompletePhoneNumber,
    parsePhoneNumber,
    validatePhoneNumberLength,
} from 'libphonenumber-js/core';

import type {MaskitoPhoneParams} from '../phone-mask';

/**
 * Converts an international phone value to national format.
 */
function convertToNationalFormat(
    value: string,
    countryIsoCode: CountryCode,
    metadata: MetadataJson,
): string | null {
    const formatter = new AsYouType(countryIsoCode, metadata);

    formatter.input(value);
    const numberValue = formatter.getNumberValue() ?? '';

    formatter.reset();

    if (!numberValue) {
        return null;
    }

    try {
        const phone = parsePhoneNumber(numberValue, countryIsoCode, metadata);

        return formatIncompletePhoneNumber(
            phone.nationalNumber,
            countryIsoCode,
            metadata,
        );
    } catch {
        return null;
    }
}

export function validatePhonePreprocessorGenerator({
    prefix,
    countryIsoCode,
    metadata,
    format = 'INTERNATIONAL',
}: Pick<MaskitoPhoneParams, 'countryIsoCode' | 'format' | 'metadata'> & {
    prefix: string;
}): MaskitoPreprocessor {
    const isNational = format === 'NATIONAL';

    return ({elementState, data}) => {
        const {selection, value} = elementState;
        const [from] = selection;
        /**
         * For national format, prefix is empty, so selectionIncludesPrefix is always false.
         */
        const selectionIncludesPrefix = prefix.length > 0 && from < prefix.length;
        const cleanCode = prefix.trim();

        /**
         * Handle autocomplete: when value doesn't match expected format.
         * For international: value should start with '+' or country code.
         * For national: value should not start with '+'.
         */
        if (value && !data) {
            if (isNational && value.startsWith('+') && countryIsoCode) {
                /**
                 * For national format, if autocomplete provides international format,
                 * convert it to national format.
                 */
                const formattedNational = convertToNationalFormat(
                    value,
                    countryIsoCode,
                    metadata,
                );

                if (formattedNational) {
                    return {elementState: {value: formattedNational, selection}};
                }
            } else if (!isNational && !value.startsWith(cleanCode)) {
                /**
                 * International format autocomplete handling.
                 */
                const formatter = new AsYouType(countryIsoCode, metadata);

                formatter.input(value);
                const numberValue = formatter.getNumberValue() ?? '';

                formatter.reset();

                return {elementState: {value: formatter.input(numberValue), selection}};
            }
        }

        try {
            const validationError = validatePhoneNumberLength(
                data,
                {defaultCountry: countryIsoCode},
                metadata,
            );

            if (!validationError || validationError === 'TOO_SHORT') {
                /**
                 * Handle paste-event with different code, for example for 8 / +7.
                 */
                const phone = countryIsoCode
                    ? parsePhoneNumber(data, countryIsoCode, metadata)
                    : parsePhoneNumber(data, metadata);

                const {nationalNumber, countryCallingCode} = phone;

                if (isNational && countryIsoCode) {
                    /**
                     * For national format, always return just the national number.
                     * The mask will format it according to the country's national format.
                     */
                    return {
                        elementState: {
                            selection,
                            value: '',
                        },
                        data: nationalNumber,
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
