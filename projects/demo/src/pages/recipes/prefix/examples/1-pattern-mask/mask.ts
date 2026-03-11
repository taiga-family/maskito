import type {MaskitoOptions} from '@maskito/core';

export default {
    mask: ({value}) => {
        const digitsCount = value.replaceAll(/\D/g, '').length;

        return ['$', ...Array.from<RegExp>({length: digitsCount || 1}).fill(/\d/)];
    },
} satisfies MaskitoOptions;
