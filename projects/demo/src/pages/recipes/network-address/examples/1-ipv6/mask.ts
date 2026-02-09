import type {MaskitoOptions} from '@maskito/core';

const hexGroup = Array.from({length: 4}, () => /[0-9A-F]/i);

export default {
    mask: Array.from({length: 8}, (_, i) => (i ? [':', ...hexGroup] : hexGroup)).flat(),
    postprocessors: [({value, selection}) => ({value: value.toLowerCase(), selection})],
} satisfies MaskitoOptions;
