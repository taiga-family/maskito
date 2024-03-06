import type {MaskitoPreprocessor} from '@maskito/core';

import {toHalfWidthColon} from '../utils';

/**
 * Convert full width colon (：) to half width one (:)
 */
export function createColonConvertPreprocessor(): MaskitoPreprocessor {
    return ({elementState, data}) => {
        const {value, selection} = elementState;

        return {
            elementState: {
                selection,
                value: toHalfWidthColon(value),
            },
            data: toHalfWidthColon(data),
        };
    };
}
