import type {MaskitoOptions} from '@maskito/core';
import {MASKITO_DEFAULT_OPTIONS} from '@maskito/core';
import type {CountryCode, MetadataJson} from 'libphonenumber-js/core';
import {AsYouType} from 'libphonenumber-js/core';

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
            const newPhoneLength = value.replaceAll(/\D/g, '').length;

            /**
             * When Maskito is initialized on an element that already has a value,
             * the closure state (currentTemplate, currentPhoneLength) is not yet
             * initialized. We detect this case by checking if currentPhoneLength
             * is 0 but the value already has digits, and initialize the state
             * from the actual value before running selectTemplate.
             */
            if (currentPhoneLength === 0 && newPhoneLength > 0) {
                currentTemplate = newTemplate;
                currentPhoneLength = newPhoneLength;
            }

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
        preprocessors: [
            validatePhonePreprocessorGenerator({
                prefix,
                countryIsoCode: defaultIsoCode,
                metadata,
            }),
        ],
        postprocessors: [phoneLengthPostprocessorGenerator(metadata)],
    };
}
