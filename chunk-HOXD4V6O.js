import"./chunk-TIC6Q35B.js";var o=`import type {MaskitoOptions} from '@maskito/core';

export default {
    mask: /^(?:|[^@\\s]+(?:@[^@\\s]*)?)$/,
    postprocessors: [
        ({value, selection}) => ({
            selection,
            value: value.replace(/^mailto:/i, ''),
        }),
    ],
} satisfies MaskitoOptions;
`;export{o as default};
