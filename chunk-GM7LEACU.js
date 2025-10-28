import"./chunk-6M32EY24.js";var e=`import type {MaskitoOptions} from '@maskito/core';
import {maskitoAddOnFocusPlugin, maskitoRemoveOnBlurPlugin} from '@maskito/kit';
import {maskitoPhoneOptionsGenerator} from '@maskito/phone';
import {getCountryCallingCode} from 'libphonenumber-js/core';
import metadata from 'libphonenumber-js/min/metadata';

const countryIsoCode = 'TR';
const code = getCountryCallingCode(countryIsoCode, metadata);
const prefix = \`+\${code} \`;

const phoneOptions = maskitoPhoneOptionsGenerator({
    metadata,
    countryIsoCode,
    strict: true,
});

export default {
    ...phoneOptions,
    plugins: [
        ...phoneOptions.plugins,
        maskitoAddOnFocusPlugin(prefix),
        maskitoRemoveOnBlurPlugin(prefix),
    ],
} satisfies MaskitoOptions;
`;export{e as default};
