import {MaskitoOptions} from '@maskito/core';

export default {
    mask: ({value}) => {
        const digitsMask = Array.from(value.replace(/%/g, '')).map(() => /\d/);

        if (!digitsMask.length) {
            return [/\d/];
        }

        return [...digitsMask, '%'];
    },
} as MaskitoOptions;
