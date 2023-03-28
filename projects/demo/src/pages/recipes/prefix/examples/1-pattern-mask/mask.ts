import {MaskitoOptions} from '@maskito/core';

export default {
    mask: ({value}) => {
        const digitsCount = value.replace(/\D/g, '').length;

        if (!digitsCount) {
            return ['$', /\d/];
        }

        return ['$', ...new Array(digitsCount).fill(/\d/)];
    },
} as MaskitoOptions;
