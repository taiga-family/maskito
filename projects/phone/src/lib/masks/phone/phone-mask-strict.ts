import type {MaskitoOptions} from '@maskito/core';
import {MASKITO_DEFAULT_OPTIONS} from '@maskito/core';
import {maskitoCaretGuard, maskitoPrefixPostprocessorGenerator} from '@maskito/kit';
import type {CountryCode, MetadataJson} from 'libphonenumber-js/core';
import {AsYouType, getCountryCallingCode} from 'libphonenumber-js/core';

import type {PhoneNumberFormat} from './phone-mask';
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
    format = 'INTERNATIONAL',
}: {
    countryIsoCode: CountryCode;
    metadata: MetadataJson;
    separator?: string;
    /**
     * Phone number format.
     * - 'INTERNATIONAL' (default): Includes country code prefix (e.g., +1 212 343-3355)
     * - 'NATIONAL': Country-specific format without country code (e.g., (212) 343-3355)
     */
    format?: PhoneNumberFormat;
}): Required<MaskitoOptions> {
    const isNational = format === 'NATIONAL';
    const code = getCountryCallingCode(countryIsoCode, metadata);
    const formatter = new AsYouType(countryIsoCode, metadata);
    /**
     * For international format: prefix is "+{countryCode} " (e.g., "+1 ")
     * For national format: prefix is empty string (no country code displayed)
     */
    const prefix = isNational ? '' : `+${code} `;

    let currentTemplate = '';
    let currentPhoneLength = 0;

    return {
        ...MASKITO_DEFAULT_OPTIONS,
        mask: ({value}) => {
            const newTemplate = getPhoneTemplate({
                formatter,
                value,
                separator,
                countryIsoCode,
                metadata,
                format,
            });
            const newPhoneLength = value.replaceAll(/\D/g, '').length;

            currentTemplate = selectTemplate({
                currentTemplate,
                newTemplate,
                currentPhoneLength,
                newPhoneLength,
            });
            currentPhoneLength = newPhoneLength;

            return generatePhoneMask({value, template: currentTemplate, prefix});
        },
        plugins: isNational
            ? []
            : [
                  maskitoCaretGuard((value, [from, to]) => [
                      from === to ? prefix.length : 0,
                      value.length,
                  ]),
              ],
        preprocessors: [
            cutInitCountryCodePreprocessor({countryIsoCode, metadata, format}),
            validatePhonePreprocessorGenerator({
                prefix,
                countryIsoCode,
                metadata,
                format,
            }),
        ],
        postprocessors: isNational
            ? [phoneLengthPostprocessorGenerator(metadata)]
            : [
                  maskitoPrefixPostprocessorGenerator(prefix),
                  phoneLengthPostprocessorGenerator(metadata),
              ],
    };
}
