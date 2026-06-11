import"./chunk-TIC6Q35B.js";var i=`import type {MaskitoOptions} from '@maskito/core';
import {maskitoAddOnFocusPlugin, maskitoRemoveOnBlurPlugin} from '@maskito/kit';
import {maskitoPhone} from '@maskito/phone';
import {getCountryCallingCode} from 'libphonenumber-js/core';
import metadata from 'libphonenumber-js/min/metadata';

const countryIsoCode = 'TR';
const code = getCountryCallingCode(countryIsoCode, metadata);
const prefix = \`+\${code} \`;

const phoneOptions = maskitoPhone({
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
`;export{i as default};
