import type {MaskitoPreprocessor} from '@maskito/core';
import type {CountryCode, MetadataJson} from 'libphonenumber-js/core';
import {
    AsYouType,
    formatIncompletePhoneNumber,
    parsePhoneNumber,
} from 'libphonenumber-js/core';

import type {MaskitoPhoneParams} from '../phone-mask';

function extractNumberValue(
    value: string,
    countryIsoCode: CountryCode | undefined,
    metadata: MetadataJson,
): string {
    const formatter = new AsYouType(countryIsoCode, metadata);

    formatter.input(value);

    const numberValue = formatter.getNumberValue() ?? '';

    formatter.reset();

    return numberValue;
}

/**
 * Converts an international phone value to national format.
 */
function convertToNationalFormat(
    value: string,
    countryIsoCode: CountryCode,
    metadata: MetadataJson,
): string {
    const numberValue = extractNumberValue(value, countryIsoCode, metadata);

    if (!numberValue) {
        return '';
    }

    try {
        const phone = parsePhoneNumber(numberValue, countryIsoCode, metadata);

        return formatIncompletePhoneNumber(
            phone.nationalNumber,
            countryIsoCode,
            metadata,
        );
    } catch {
        return '';
    }
}

export function browserAutofillPreprocessorGenerator({
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
                const numberValue = extractNumberValue(value, countryIsoCode, metadata);
                const formatter = new AsYouType(countryIsoCode, metadata);

                return {elementState: {value: formatter.input(numberValue), selection}};
            }
        }

        return {elementState};
    };
}
