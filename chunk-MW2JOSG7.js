import"./chunk-TIC6Q35B.js";var e=`import type {MaskitoOptions} from '@maskito/core';

const HEX_GROUP = Array.from({length: 4}, () => /[0-9A-F]/i);

export default {
    mask: Array.from({length: 8}, (_, i) => (i ? [':', ...HEX_GROUP] : HEX_GROUP)).flat(),
    postprocessors: [({value, selection}) => ({value: value.toLowerCase(), selection})],
} satisfies MaskitoOptions;
`;export{e as default};
