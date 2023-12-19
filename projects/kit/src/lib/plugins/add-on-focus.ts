import {MaskitoPlugin, maskitoSetElementValue} from '@maskito/core';

import {maskitoEventHandler} from './event-handler';

export function maskitoAddOnFocusPlugin(value: string): MaskitoPlugin {
    return maskitoEventHandler('focus', element => {
        if (!element.value) {
            maskitoSetElementValue(element, value);
        }
    });
}
