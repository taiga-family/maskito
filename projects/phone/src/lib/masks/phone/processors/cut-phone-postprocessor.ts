import {MaskitoPostprocessor} from '@maskito/core';
import {CountryCode, MetadataJson} from 'libphonenumber-js/core';

import {cutPhoneByValidLength} from '../utils';

const MIN_LENGTH = 3;
export function maskitoCutPhonePostprocessorGenerator(
    metadata: MetadataJson,
    countryIsoCode: CountryCode,
): MaskitoPostprocessor {
    return ({value, selection}) => {
        if (value.length > MIN_LENGTH) {
            return {
                value: cutPhoneByValidLength({phone: value, countryIsoCode, metadata}),
                selection,
            };
        }

        return {value, selection};
    };
}
