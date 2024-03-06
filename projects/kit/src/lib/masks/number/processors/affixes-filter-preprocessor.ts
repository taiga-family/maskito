import type {MaskitoPreprocessor} from '@maskito/core';

import {extractAffixes} from '../../../utils';

/**
 * It drops prefix and postfix from data
 * Needed for case, when prefix or postfix contain decimalSeparator, to ignore it in resulting number
 * @example User pastes '{prefix}123.45{postfix}' => 123.45
 */
export function createAffixesFilterPreprocessor({
    prefix,
    postfix,
}: {
    prefix: string;
    postfix: string;
}): MaskitoPreprocessor {
    return ({elementState, data}) => {
        const {cleanValue: cleanData} = extractAffixes(data, {
            prefix,
            postfix,
        });

        return {
            elementState,
            data: cleanData,
        };
    };
}
