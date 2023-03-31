import {MaskitoOptions} from '@maskito/core';

export default {
    mask: ({value}) => {
        const digitsCount = value.replace(/\D/g, '').length;

        return ['$', ...new Array(digitsCount || 1).fill(/\d/)];
    },
} as MaskitoOptions;
