import {MaskitoPlugin} from '@maskito/core';
import {maskitoEventHandler} from './event-handler';

export function maskitoRemoveOnBlurPlugin(value: string): MaskitoPlugin {
    return maskitoEventHandler('blur', element => {
        if (element.value === value) {
            element.value = '';
            element.dispatchEvent(new Event('input'));
        }
    });
}
