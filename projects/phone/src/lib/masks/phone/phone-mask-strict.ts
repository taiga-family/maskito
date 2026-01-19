import type {MaskitoOptions} from '@maskito/core';
import {MASKITO_DEFAULT_OPTIONS} from '@maskito/core';
import {maskitoCaretGuard, maskitoPrefixPostprocessorGenerator} from '@maskito/kit';
import {AsYouType, getCountryCallingCode} from 'libphonenumber-js/core';

import type {MaskitoPhoneParams} from './phone-mask';
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
}: Omit<Required<MaskitoPhoneParams>, 'strict'>): Required<MaskitoOptions> {
    const isNational = format === 'NATIONAL';
    const code = getCountryCallingCode(countryIsoCode, metadata);
    const formatter = new AsYouType(countryIsoCode, metadata);
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
        plugins: [
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
