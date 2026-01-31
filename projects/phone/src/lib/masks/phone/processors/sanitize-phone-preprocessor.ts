import type {MaskitoPreprocessor} from '@maskito/core';

export function sanitizePhonePreprocessorGenerator(): MaskitoPreprocessor {
    return ({elementState, data}) => {
        const sanitizedData = data.replaceAll(/[^\d+]/g, '');

        return {
            elementState,
            data: sanitizedData,
        };
    };
}
