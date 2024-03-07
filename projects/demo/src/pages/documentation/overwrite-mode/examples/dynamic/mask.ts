import type {MaskitoOptions} from '@maskito/core';

const maskitoOptions: MaskitoOptions = {
    mask: /^[^а-яё]+$/i,
    overwriteMode: ({value}) => {
        const includesOnlyDigits = /^\d+$/.test(value);

        return includesOnlyDigits ? 'replace' : 'shift';
    },
};

export default maskitoOptions;
