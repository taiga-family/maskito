import {MASKITO_DEFAULT_OPTIONS, MaskitoOptions} from '@maskito/core';
import {AsYouType, CountryCode, MetadataJson} from 'libphonenumber-js/core';

import {
    phoneLengthPostprocessorGenerator,
    validatePhonePreprocessorGenerator,
} from './processors';
import {generatePhoneMask, getPhoneTemplate} from './utils';

export function maskitoPhoneNonStrictOptionsGenerator({
    defaultIsoCode,
    metadata,
}: {
    defaultIsoCode?: CountryCode;
    metadata: MetadataJson;
}): Required<MaskitoOptions> {
    const formatter = new AsYouType(defaultIsoCode, metadata);
    const prefix = '+';
    let template = '';
    let prevPhoneLength = 0;

    return {
        ...MASKITO_DEFAULT_OPTIONS,
        mask: ({value}) => {
            const newTemplate = getPhoneTemplate(formatter, value);
            const phoneLength = value.replace(/\D/g, '').length;

            template =
                newTemplate.length < template.length && phoneLength > prevPhoneLength
                    ? template
                    : newTemplate;
            prevPhoneLength = phoneLength;
            const mask = generatePhoneMask({value, template, prefix});

            return template.length === 1 ? ['+', /\d/] : mask;
        },
        postprocessors: [phoneLengthPostprocessorGenerator(metadata)],
        preprocessors: [
            validatePhonePreprocessorGenerator({
                prefix,
                countryIsoCode: defaultIsoCode,
                metadata,
            }),
        ],
    };
}
