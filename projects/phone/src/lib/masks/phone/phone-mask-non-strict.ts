import {MASKITO_DEFAULT_OPTIONS, MaskitoOptions} from '@maskito/core';
import {AsYouType, CountryCode, MetadataJson} from 'libphonenumber-js/core';

import {
    phoneLengthPostprocessorGenerator,
    validatePhonePreprocessorGenerator,
} from './processors';
import {generatePhoneMask, getPhoneTemplate, selectTemplate} from './utils';

export function maskitoPhoneNonStrictOptionsGenerator({
    defaultIsoCode,
    metadata,
    separator = '-',
}: {
    defaultIsoCode?: CountryCode;
    metadata: MetadataJson;
    separator?: string;
}): Required<MaskitoOptions> {
    const formatter = new AsYouType(defaultIsoCode, metadata);
    const prefix = '+';
    let currentTemplate = '';
    let currentPhoneLength = 0;

    return {
        ...MASKITO_DEFAULT_OPTIONS,
        mask: ({value}) => {
            const newTemplate = getPhoneTemplate(formatter, value, separator);
            const newPhoneLength = value.replace(/\D/g, '').length;

            currentTemplate = selectTemplate({
                currentTemplate,
                newTemplate,
                currentPhoneLength,
                newPhoneLength,
            });
            currentPhoneLength = newPhoneLength;

            return currentTemplate.length === 1
                ? ['+', /\d/]
                : generatePhoneMask({value, template: currentTemplate, prefix});
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
