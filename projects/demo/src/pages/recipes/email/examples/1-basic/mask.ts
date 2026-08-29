import type {MaskitoOptions} from '@maskito/core';

export default {
    mask: /^(?:|[^@\s]+(?:@[^@\s]*)?)$/,
    preprocessors: [
        ({elementState, data}) => ({
            elementState,
            data: data.replace(/^mailto:/i, ''),
        }),
    ],
} satisfies MaskitoOptions;
