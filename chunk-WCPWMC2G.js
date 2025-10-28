import"./chunk-6M32EY24.js";var s=`import type {MaskitoOptions} from '@maskito/core';

const maskitoOptions: MaskitoOptions = {
    mask: /^[^\u0430-\u044F\u0451]+$/i,
    overwriteMode: ({value}) => {
        const includesOnlyDigits = /^\\d+$/.test(value);

        return includesOnlyDigits ? 'replace' : 'shift';
    },
};

export default maskitoOptions;
`;export{s as default};
