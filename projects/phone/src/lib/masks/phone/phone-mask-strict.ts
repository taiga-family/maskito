import {MASKITO_DEFAULT_OPTIONS, MaskitoOptions} from '@maskito/core';
import {
    maskitoAddOnFocusPlugin,
    maskitoCaretGuard,
    maskitoPrefixPostprocessorGenerator,
    maskitoRemoveOnBlurPlugin,
} from '@maskito/kit';
import {
    AsYouType,
    CountryCode,
    getCountryCallingCode,
    MetadataJson,
} from 'libphonenumber-js/core';

import {
    cutInitCountryCodePreprocessor,
    phoneLengthPostprocessorGenerator,
    validatePhonePreprocessorGenerator,
} from './processors';
import {generatePhoneMask, getPhoneTemplate, selectTemplate} from './utils';

export function maskitoPhoneStrictOptionsGenerator({
    countryIsoCode,
    metadata,
    separator = '-',
}: {
    countryIsoCode: CountryCode;
    metadata: MetadataJson;
    separator?: string;
}): Required<MaskitoOptions> {
    const code = getCountryCallingCode(countryIsoCode, metadata);
    const formatter = new AsYouType(countryIsoCode, metadata);
    const prefix = `+${code} `;

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

            return generatePhoneMask({value, template: currentTemplate, prefix});
        },
        plugins: [
            maskitoCaretGuard((value, [from, to]) => [
                from === to ? prefix.length : 0,
                value.length,
            ]),
            // TODO: drop `maskitoAddOnFocusPlugin` & `maskitoRemoveOnBlurPlugin`
            // TODO: Add examples how to enable `maskitoAddOnFocusPlugin` & `maskitoRemoveOnBlurPlugin` on https://maskito.dev/addons/phone
            maskitoRemoveOnBlurPlugin(prefix),
            maskitoAddOnFocusPlugin(prefix),
        ],
        postprocessors: [
            maskitoPrefixPostprocessorGenerator(prefix),
            phoneLengthPostprocessorGenerator(metadata),
        ],
        preprocessors: [
            cutInitCountryCodePreprocessor({countryIsoCode, metadata}),
            validatePhonePreprocessorGenerator({prefix, countryIsoCode, metadata}),
        ],
    };
}
