import {MaskitoOptions} from '@maskito/core';

const INTERNATIONAL_PHONE_PATTERNS = {
    RU: '+7 (###) ###-##-##',
    US: '+1(###) ###-####',
};

export function maskitoPhoneOptionsGenerator(countryCode: 'RU' | 'US'): MaskitoOptions {
    const phonePattern = INTERNATIONAL_PHONE_PATTERNS[countryCode];
    const mask = phonePattern.split('').map(char => (char === '#' ? /\d/ : char));

    const countryPrefix = phonePattern.replace(/[(#].*/g, '');
    const minCaretIndex = countryPrefix.length;

    return {
        mask,
        postprocessor: ({value, selection}) => {
            return value.length > minCaretIndex
                ? {selection, value}
                : {selection: [minCaretIndex, minCaretIndex], value: countryPrefix};
        },
    };
}
