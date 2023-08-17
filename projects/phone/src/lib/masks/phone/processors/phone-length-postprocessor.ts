import {MaskitoPostprocessor} from '@maskito/core';
import {CountryCode, MetadataJson} from 'libphonenumber-js/core';

import {cutPhoneByValidLength} from '../utils';

const MIN_LENGTH = 3;
export function phoneLengthPostprocessorGenerator(
    metadata: MetadataJson,
    countryIsoCode: CountryCode,
): MaskitoPostprocessor {
    return ({value, selection}) => ({
        value:
            value.length > MIN_LENGTH
                ? cutPhoneByValidLength({phone: value, countryIsoCode, metadata})
                : value,
        selection,
    });
}
