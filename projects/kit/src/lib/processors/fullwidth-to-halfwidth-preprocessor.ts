import {MaskitoPreprocessor} from '@maskito/core';

import {toHalfWidthNumber} from '../utils';

/**
 * Convert full width numbers like １, ２ to half width numbers 1, 2
 */
export function createFullWidthToHalfWidthPreprocessor(): MaskitoPreprocessor {
    return ({elementState, data}) => {
        const {value, selection} = elementState;

        return {
            elementState: {
                selection,
                value: toHalfWidthNumber(value),
            },
            data: toHalfWidthNumber(data),
        };
    };
}
