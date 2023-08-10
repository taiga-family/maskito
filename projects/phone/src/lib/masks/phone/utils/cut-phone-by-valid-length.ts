import {
    CountryCode,
    MetadataJson,
    validatePhoneNumberLength,
} from 'libphonenumber-js/core';

export function cutPhoneByValidLength({
    phone,
    countryIsoCode,
    metadata,
}: {
    phone: string;
    countryIsoCode: CountryCode;
    metadata: MetadataJson;
}): string {
    const validationResult = validatePhoneNumberLength(phone, metadata);

    if (validationResult === 'INVALID_LENGTH' || validationResult === 'TOO_LONG') {
        return cutPhoneByValidLength({
            phone: phone.slice(0, phone.length - 1),
            countryIsoCode,
            metadata,
        });
    }

    return phone;
}
