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
    maskitoPhoneLengthPostprocessorGenerator,
    maskitoValidatePhonePreprocessorGenerator,
} from './processors';
import {generatePhoneMask, getPhoneTemplate} from './utils';

export function maskitoPhoneOptionsGenerator({
    countryIsoCode,
    metadata,
}: {
    countryIsoCode: CountryCode;
    metadata: MetadataJson;
}): Required<MaskitoOptions> {
    const code = getCountryCallingCode(countryIsoCode, metadata);
    const formatter = new AsYouType(countryIsoCode, metadata);
    const prefix = `+${code} `;

    return {
        ...MASKITO_DEFAULT_OPTIONS,
        mask: ({value}) => {
            const template = getPhoneTemplate(formatter, value);

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
            maskitoPhoneLengthPostprocessorGenerator(metadata, countryIsoCode),
        ],
        preprocessors: [
            cutInitCountryCodePreprocessor({countryIsoCode, metadata}),
            maskitoValidatePhonePreprocessorGenerator({prefix, countryIsoCode, metadata}),
        ],
    };
}
