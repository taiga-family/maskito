import type {MaskitoPreprocessor} from '@maskito/core';
import {parsePhoneNumber} from 'libphonenumber-js/core';

import type {MaskitoPhoneParams} from '../phone-mask';

export function pasteStrictPhonePreprocessorGenerator({
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
        const selectionIncludesPrefix = from < prefix.length;

        // handle paste of a number when input contains only the prefix
        if (data.length > 2 && value.trim() === prefix.trim()) {
            // handle paste-event with different code, for example for 8 / +7
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

        return {elementState};
    };
}
