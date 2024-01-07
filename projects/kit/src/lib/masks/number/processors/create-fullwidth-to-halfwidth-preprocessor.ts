import {MaskitoPreprocessor} from '@maskito/core';

/**
 * Convert full width numbers like １, ２ to half width numbers 1, 2
 *
 * 全角の１、２ののような数字を、半角の1、2のように直すプリプロセッサ
 */
export function createFullWidthToHalfWidthPreprocessor(): MaskitoPreprocessor {
    return ({elementState, data}) => {
        const {value, selection} = elementState;

        return {
            elementState: {
                selection,
                value: value.replace(/[０-９]/g, s =>
                    String.fromCharCode(s.charCodeAt(0) - 0xfee0),
                ),
            },
            data: data.replace(/[０-９]/g, s =>
                String.fromCharCode(s.charCodeAt(0) - 0xfee0),
            ),
        };
    };
}
