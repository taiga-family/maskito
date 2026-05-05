import {type MetadataJson, validatePhoneNumberLength} from 'libphonenumber-js/core';

export function cutPhoneByValidLength({
    phone,
    metadata,
}: {
    phone: string;
    metadata: MetadataJson;
}): string {
    const validationResult = validatePhoneNumberLength(phone, metadata);

    return validationResult === 'TOO_LONG'
        ? cutPhoneByValidLength({
              phone: phone.slice(0, phone.length - 1),
              metadata,
          })
        : phone;
}
