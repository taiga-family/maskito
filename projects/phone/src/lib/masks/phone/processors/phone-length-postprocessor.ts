import {MaskitoPostprocessor} from '@maskito/core';
import {MetadataJson} from 'libphonenumber-js/core';

import {cutPhoneByValidLength} from '../utils';

const MIN_LENGTH = 3;
export function phoneLengthPostprocessorGenerator(
    metadata: MetadataJson,
): MaskitoPostprocessor {
    return ({value, selection}) => ({
        value:
            value.length > MIN_LENGTH
                ? cutPhoneByValidLength({phone: value, metadata})
                : value,
        selection,
    });
}
