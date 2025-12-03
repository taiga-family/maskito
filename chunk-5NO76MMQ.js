import"./chunk-ENRHZQ2S.js";var e=`import type {MaskitoOptions} from '@maskito/core';

export default {
    mask: ({value}) => {
        const digitsCount = value.replaceAll(/\\D/g, '').length;

        return ['$', ...new Array(digitsCount || 1).fill(/\\d/)];
    },
} satisfies MaskitoOptions;
`;export{e as default};
