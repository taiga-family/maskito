import type {MaskitoPreprocessor} from '@maskito/core';
import type {CountryCode, MetadataJson} from 'libphonenumber-js/core';
import {parsePhoneNumber} from 'libphonenumber-js/core';

export function pasteNonStrictPhonePreprocessorGenerator({
    prefix,
    countryIsoCode,
    metadata,
}: {
    prefix: string;
    countryIsoCode?: CountryCode;
    metadata: MetadataJson;
}): MaskitoPreprocessor {
    return ({elementState, data}) => {
        const {selection, value} = elementState;

        // handle paste of a number when input is empty
        if (data.length > 2 && value === '') {
            const phone = (() => {
                if (!data.startsWith(prefix) && countryIsoCode) {
                    try {
                        const normalized = `+${data}`;

                        return parsePhoneNumber(normalized, countryIsoCode, metadata);
                    } catch {
                        // fallback: try original data without normalization
                        return parsePhoneNumber(data, countryIsoCode, metadata);
                    }
                } else {
                    return parsePhoneNumber(data, metadata);
                }
            })();

            const {number} = phone;

            return {
                elementState: {
                    selection,
                    value: '',
                },
                data: number,
            };
        }

        return {elementState};
    };
}
