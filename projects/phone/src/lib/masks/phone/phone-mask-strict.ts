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
import {generatePhoneMask, getPhoneTemplate} from './utils';

export function maskitoPhoneStrictOptionsGenerator({
    countryIsoCode,
    metadata,
}: {
    countryIsoCode: CountryCode;
    metadata: MetadataJson;
}): Required<MaskitoOptions> {
    const code = getCountryCallingCode(countryIsoCode, metadata);
    const formatter = new AsYouType(countryIsoCode, metadata);
    const prefix = `+${code} `;

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

            return generatePhoneMask({value, template, prefix});
        },
        plugins: [
            maskitoCaretGuard((value, [from, to]) => [
                from === to ? prefix.length : 0,
                value.length,
            ]),
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
