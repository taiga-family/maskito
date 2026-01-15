import type {AsYouType, CountryCode, MetadataJson} from 'libphonenumber-js/core';
import {formatIncompletePhoneNumber} from 'libphonenumber-js/core';

import type {MaskitoPhoneParams} from '../phone-mask';

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
    format?: MaskitoPhoneParams['format'];
}): string {
    const isNational = format === 'NATIONAL';

    if (isNational && countryIsoCode && metadata) {
        const normalizedValue = value && !value.startsWith('+') ? `+${value}` : value;

        formatter.input(normalizedValue.replaceAll(/[^\d+]/g, ''));

        return getNationalPhoneTemplate({
            value: normalizedValue,
            countryIsoCode,
            metadata,
            separator,
        });
    }

    return getInternationalPhoneTemplate({formatter, value, separator});
}

function getInternationalPhoneTemplate({
    formatter,
    value,
    separator,
}: {
    formatter: AsYouType;
    value: string;
    separator: string;
}): string {
    const hasDigitsOrPlus = /[\d+]/.test(value);

    if (!hasDigitsOrPlus) {
        return '';
    }

    const normalizedValue = value.startsWith('+') ? value : `+${value}`;

    formatter.input(normalizedValue.replaceAll(/[^\d+]/g, ''));

    const initialTemplate = formatter.getTemplate();
    const split = initialTemplate.split(' ');
    // Join first two parts with space, remaining parts with custom separator
    const template =
        split.length > 1
            ? `${split.slice(0, 2).join(' ')} ${split.slice(2).join(separator)}`
            : initialTemplate;

    formatter.reset();

    return template.trim();
}

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

    const formatted = formatIncompletePhoneNumber(digitsOnly, countryIsoCode, metadata);
    const template = formatted.replaceAll(/\d/g, 'x');

    // Space-separated formats (like FR): join groups after first with separator
    if (!formatted.includes('-')) {
        const parts = template.split(' ');

        return parts.length > 1
            ? `${parts[0]} ${parts.slice(1).join(separator)}`
            : template;
    }

    // Dash-separated formats (like US, RU): swap dashes for custom separator
    return template.replaceAll('-', separator);
}
