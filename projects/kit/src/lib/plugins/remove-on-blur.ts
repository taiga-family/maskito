import type {MaskitoPlugin} from '@maskito/core';
import {maskitoUpdateElement} from '@maskito/core';

import {maskitoEventHandler} from './event-handler';

export function maskitoRemoveOnBlurPlugin(value: string): MaskitoPlugin {
    return maskitoEventHandler('blur', (element) => {
        if (element.value === value) {
            maskitoUpdateElement(element, '');
        }
    });
}
