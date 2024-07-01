import type {MaskitoPlugin} from '@maskito/core';
import {maskitoUpdateElement} from '@maskito/core';

import {maskitoEventHandler} from './event-handler';

export function maskitoAddOnFocusPlugin(value: string): MaskitoPlugin {
    return maskitoEventHandler('focus', (element) => {
        if (!element.value) {
            maskitoUpdateElement(element, value);
        }
    });
}
