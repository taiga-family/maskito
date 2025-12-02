import type {AsYouType} from 'libphonenumber-js/core';

import {TEMPLATE_FILLER} from '../constants';

export function getPhoneTemplate(
    formatter: AsYouType,
    value: string,
    separator: string,
): string {
    formatter.input(value.replaceAll(/[^\d+]/g, ''));

    const initialTemplate = formatter.getTemplate();
    const split = initialTemplate.split(' ');
    const template =
        split.length > 1
            ? `${split.slice(0, 2).join(' ')} ${split.slice(2).join(separator)}`
            : initialTemplate;

    formatter.reset();

    return template.trim();
}

export function getNationalPhoneTemplate(
    formatter: AsYouType,
    value: string,
    separator: string,
): string {
    // Input the digits to get the phone number
    const digitsOnly = value.replaceAll(/\D/g, '');

    formatter.input(digitsOnly);

    const phoneNumber = formatter.getNumber();

    if (!phoneNumber) {
        formatter.reset();

        // Return a basic template based on the input length
        return digitsOnly
            .split('')
            .map(() => TEMPLATE_FILLER)
            .join('');
    }

    // Get the national format string (e.g., "(213) 373-4253" for US)
    const nationalFormatted = phoneNumber.formatNational();

    // Convert the formatted string to a template by replacing digits with TEMPLATE_FILLER
    // and applying the separator where appropriate
    const template = convertToTemplate(nationalFormatted, separator);

    formatter.reset();

    return template;
}

function convertToTemplate(formattedNumber: string, separator: string): string {
    // Replace digits with template filler, preserve formatting characters
    let template = formattedNumber.replaceAll(/\d/g, TEMPLATE_FILLER);

    // For some countries, we may want to apply the separator differently
    // For now, we keep the national format's natural separators (spaces, dashes, parentheses)
    // but allow customization via the separator parameter for the digit groups

    // If the format uses spaces between digit groups (not counting parentheses),
    // replace those spaces with the custom separator
    if (separator !== ' ' && separator !== '-') {
        // Split by space, but preserve parenthetical groups
        const parts = template.split(' ');

        if (parts.length > 1) {
            // Check if first part contains parentheses (like "(xxx)")
            const hasParenthesesPrefix = parts[0]?.includes('(');

            if (hasParenthesesPrefix && parts.length > 1) {
                // Keep the parentheses part as-is, join the rest with separator
                template = `${parts[0]} ${parts.slice(1).join(separator)}`;
            } else {
                template = parts.join(separator);
            }
        }
    }

    return template;
}
