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
    // National formatter works with digits-only input, so strip everything else first.
    const digitsOnly = value.replaceAll(/\D/g, '');

    if (!digitsOnly) {
        return '';
    }

    // Feeding AsYouType incrementally yields the same separators/parens users just typed.
    formatter.input(digitsOnly);

    // getTemplate() exposes the “mask” that matches the current digit count.
    const liveTemplate = formatter.getTemplate();
    // getNumber() returns the parsed phone number object.
    const phoneNumber = formatter.getNumber();

    formatter.reset();

    if (liveTemplate) {
        // AsYouType already knows how the user-facing template should look.
        return convertToTemplate(liveTemplate, separator);
    }

    if (phoneNumber) {
        // Fallback to the full national string when the template is empty (some locales).
        return convertToTemplate(phoneNumber.formatNational(), separator);
    }

    // Last resort: just show placeholders so the mask keeps accepting digits.
    return TEMPLATE_FILLER.repeat(digitsOnly.length);
}

function convertToTemplate(source: string, separator: string): string {
    if (!source) {
        return '';
    }

    // Different locales use weird whitespace; normalise it and swap all digits with fillers.
    const normalized = source
        // Swap all exotic Unicode spaces (NBSP, thin space, etc.) with a regular space.
        .replaceAll(/[\u00A0\u1680\u180E\u2000-\u200B\u202F\u205F\u3000]/g, ' ')
        // Collapse any accidental double spaces so downstream splitting is stable.
        .replaceAll(/\s{2,}/g, ' ')
        .trim();
    const withFillers = normalized.replaceAll(/[0-9x]/gi, TEMPLATE_FILLER);

    return applySeparator(withFillers, separator);
}

function applySeparator(template: string, separator: string): string {
    // Nothing to tweak if we received an empty template or the separator
    // already matches the characters we want to replace.
    if (!template || separator === ' ' || separator === '-') {
        return template;
    }

    // Split digit groups by spaces (after normalization) and drop empties.
    const parts = template.split(' ').filter(Boolean);

    // A single chunk means there are no group separators to replace.
    if (parts.length <= 1) {
        return template;
    }

    const [first, ...rest] = parts;

    // Guard against unexpected empty leading chunk.
    if (!first) {
        return template;
    }

    if (first.includes('(') && rest.length) {
        // Preserve the area-code chunk `(xxx)` and only replace the rest.
        return `${first} ${rest.join(separator)}`;
    }

    // Otherwise replace every space with the requested separator.
    return [first, ...rest].join(separator);
}
