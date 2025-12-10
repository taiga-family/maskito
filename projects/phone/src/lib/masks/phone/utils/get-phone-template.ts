import type {AsYouType, CountryCode, MetadataJson} from 'libphonenumber-js/core';
import {formatIncompletePhoneNumber} from 'libphonenumber-js/core';

import type {PhoneNumberFormat} from '../phone-mask';

/**
 * Generates a phone template string based on the current input value.
 *
 * @param formatter - AsYouType formatter instance
 * @param value - Current input value
 * @param separator - Separator character between number groups
 * @param countryIsoCode - Country ISO code (required for national format)
 * @param metadata - libphonenumber-js metadata
 * @param format - Phone number format ('INTERNATIONAL' or 'NATIONAL')
 * @returns Template string with 'x' placeholders for digits
 */
export function getPhoneTemplate({
    formatter,
    value,
    separator,
    countryIsoCode,
    metadata,
    format = 'INTERNATIONAL',
}: {
    formatter: AsYouType;
    value: string;
    separator: string;
    countryIsoCode?: CountryCode;
    metadata?: MetadataJson;
    format?: PhoneNumberFormat;
}): string {
    const isNational = format === 'NATIONAL';

    const normalizedValue = value && !value.startsWith('+') ? `+${value}` : value;

    formatter.input(normalizedValue.replaceAll(/[^\d+]/g, ''));

    if (isNational && countryIsoCode && metadata) {
        return getNationalPhoneTemplate({
            value: normalizedValue,
            countryIsoCode,
            metadata,
            separator,
        });
    }

    return getInternationalPhoneTemplate({formatter, value: normalizedValue, separator});
}

/**
 * Generates an international phone template (with country code prefix).
 * Format: +X XXX XXX-XX-XX (separator applies to groups after area code)
 */
function getInternationalPhoneTemplate({
    formatter,
    value,
    separator,
}: {
    formatter: AsYouType;
    value: string;
    separator: string;
}): string {
    formatter.input(value.replaceAll(/[^\d+]/g, ''));

    const initialTemplate = formatter.getTemplate();
    const split = initialTemplate.split(' ');
    /**
     * Join first two parts with space (country code + area code),
     * then join remaining parts with the custom separator.
     */
    const template =
        split.length > 1
            ? `${split.slice(0, 2).join(' ')} ${split.slice(2).join(separator)}`
            : initialTemplate;

    formatter.reset();

    return template.trim();
}

/**
 * Generates a national phone template (without country code prefix).
 * Uses formatIncompletePhoneNumber to get country-specific national formatting.
 * Example for US: (XXX) XXX-XXXX
 */
function getNationalPhoneTemplate({
    value,
    countryIsoCode,
    metadata,
    separator,
}: {
    value: string;
    countryIsoCode: CountryCode;
    metadata: MetadataJson;
    separator: string;
}): string {
    const digitsOnly = value.replaceAll(/\D/g, '');

    if (!digitsOnly) {
        return '';
    }

    /**
     * formatIncompletePhoneNumber returns the formatted string with actual digits.
     * We need to convert it to a template by replacing digits with 'x' placeholders.
     */
    const formatted = formatIncompletePhoneNumber(digitsOnly, countryIsoCode, metadata);

    /**
     * Convert formatted number to template by replacing digits with 'x'.
     */
    const template = formatted.replaceAll(/\d/g, 'x');

    /**
     * Apply custom separator: Replace dashes with the custom separator.
     * We identify the "main number" portion (after any trunk prefix and area code)
     * and apply the separator there.
     *
     * Strategy: Find the index after the area code (first ')' or after first space-separated group)
     * and apply separator replacement only to the portion after that.
     */
    const parts = template.split(' ');

    if (parts.length > 1) {
        /**
         * Find the area code group - it's typically the group with parentheses,
         * or if no parentheses, the first two groups form the prefix.
         */
        const areaCodeIndex = parts.findIndex((part) => part.includes(')'));

        if (areaCodeIndex >= 0) {
            /**
             * Everything up to and including the area code stays as-is (with spaces).
             * Everything after gets separators replaced and joined.
             */
            const prefixParts = parts.slice(0, areaCodeIndex + 1);
            const numberParts = parts
                .slice(areaCodeIndex + 1)
                .map((part) => part.replaceAll('-', separator));

            return `${prefixParts.join(' ')} ${numberParts.join(separator)}`;
        }

        /**
         * No parentheses found (simple format like RU without area code parens).
         * Keep first part as-is, apply separator to the rest.
         */
        const firstPart = parts[0];
        const remainingParts = parts
            .slice(1)
            .map((part) => part.replaceAll('-', separator));

        return `${firstPart} ${remainingParts.join(separator)}`;
    }

    return template;
}
