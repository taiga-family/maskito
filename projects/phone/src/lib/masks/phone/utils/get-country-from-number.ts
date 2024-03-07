import type {CountryCode, MetadataJson} from 'libphonenumber-js/core';
import {AsYouType} from 'libphonenumber-js/core';

export function maskitoGetCountryFromNumber(
    number: string,
    metadata: MetadataJson,
): CountryCode | undefined {
    const formatter = new AsYouType({}, metadata);

    formatter.input(number);

    return formatter.getCountry();
}
