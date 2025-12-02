import type {MaskitoOptions} from '@maskito/core';
import {MASKITO_DEFAULT_OPTIONS} from '@maskito/core';
import {maskitoCaretGuard, maskitoPrefixPostprocessorGenerator} from '@maskito/kit';
import type {CountryCode, MetadataJson} from 'libphonenumber-js/core';
import {AsYouType, getCountryCallingCode} from 'libphonenumber-js/core';

import {
    cutInitCountryCodePreprocessor,
    phoneLengthPostprocessorGenerator,
    validatePhonePreprocessorGenerator,
} from './processors';
import type {MaskitoPhoneFormat} from './types';
import {
    generatePhoneMask,
    getNationalPhoneTemplate,
    getPhoneTemplate,
    selectTemplate,
} from './utils';

export function maskitoPhoneStrictOptionsGenerator({
    countryIsoCode,
    metadata,
    separator = '-',
    format = 'INTERNATIONAL',
}: {
    countryIsoCode: CountryCode;
    metadata: MetadataJson;
    separator?: string;
    format?: MaskitoPhoneFormat;
}): Required<MaskitoOptions> {
    const code = getCountryCallingCode(countryIsoCode, metadata);
    const formatter = new AsYouType(countryIsoCode, metadata);
    const isNational = format === 'NATIONAL';
    const prefix = isNational ? '' : `+${code} `;

    let currentTemplate = '';
    let currentPhoneLength = 0;

    return {
        ...MASKITO_DEFAULT_OPTIONS,
        mask: ({value}) => {
            const newTemplate = isNational
                ? getNationalPhoneTemplate(formatter, value, separator)
                : getPhoneTemplate(formatter, value, separator);
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
