import type {MaskitoOptions} from '@maskito/core';
import {MASKITO_DEFAULT_OPTIONS} from '@maskito/core';
import type {CountryCode, MetadataJson} from 'libphonenumber-js/core';
import {AsYouType} from 'libphonenumber-js/core';

import {
    browserAutofillPreprocessorGenerator,
    pasteNonStrictPhonePreprocessorGenerator,
    phoneLengthPostprocessorGenerator,
    sanitizePreprocessor,
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
            const newTemplate = getPhoneTemplate({
                formatter,
                value,
                separator,
            });
            const newPhoneLength = value.replaceAll(/\D/g, '').length;

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
            sanitizePreprocessor,
            browserAutofillPreprocessorGenerator({
                prefix,
                countryIsoCode: defaultIsoCode,
                metadata,
            }),
            pasteNonStrictPhonePreprocessorGenerator({
                prefix,
                countryIsoCode: defaultIsoCode,
                metadata,
            }),
        ],
        postprocessors: [phoneLengthPostprocessorGenerator(metadata)],
    };
}
