import type {MaskitoPreprocessor} from '@maskito/core';

export const sanitizePreprocessor =
    (): MaskitoPreprocessor =>
    ({elementState, data}) => ({
        elementState,
        data: (data ?? '').replaceAll(/[^\d+]/g, ''),
    });
